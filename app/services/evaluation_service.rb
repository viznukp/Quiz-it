# frozen_string_literal: true

class EvaluationService
  def initialize(params)
    @params = params
  end

  def process!
    create_submission
    evaluate_answers
    @submission.save!
    EmailJob.perform_async(@submission.id) if @quiz.email_notification
  end

  private

    def create_submission
      @quiz = Quiz.find_by!(slug: @params[:slug])
      user = User.find(@params[:user_id])
      @questions = @quiz.questions
      @submission = Submission.new(**submission_params, user:, quiz: @quiz)
    end

    def generate_answer_key
      answer_key = {}
      @questions.each do |question|
        answer_key[question.id] = {
          answer_index: question.answer_index,
          option_count: question.options.count
        }
      end
      answer_key
    end

    def evaluate_answers
      correct_answers_count = 0
      wrong_answers_count = 0

      answer_key = generate_answer_key

      @submission.answers.each do |answer|
        question_id = answer["question_id"]
        selected_choice = answer["selected_choice"]
        correct_answer = answer_key[question_id][:answer_index]

        if selected_choice == correct_answer
          correct_answers_count += 1
        elsif (1...answer_key[question_id][:options_count]).include?(selected_choice)
          wrong_answers_count += 1
        end
      end

      total_questions = @questions.count
      @submission.total_questions = total_questions
      @submission.correct_answers_count = correct_answers_count
      @submission.wrong_answers_count = wrong_answers_count
      @submission.unanswered_count = total_questions - correct_answers_count - wrong_answers_count
    end

    def submission_params
      @params.require(:submission).permit(:status, answers: [:question_id, :selected_choice])
    end
end
