# frozen_string_literal: true

class EvaluationService
  def initialize(params)
    @params = params
  end

  def process!
    create_submission
    evaluate_answers
    @submission.save!
    EmailJob.perform_async(@submission.id) if @quiz.email_notification && submission_params[:status] == "completed"
  end

  private

    def create_submission
      @quiz = Quiz.find_by!(slug: @params[:slug])
      user = User.find(@params[:user_id])
      @questions = @quiz.questions
      @submission = Submission.find_or_initialize_by(user:, quiz: @quiz)
      @submission.answers = submission_params[:answers]
      @submission.status = submission_params[:status]
      @submission.seed = submission_params[:seed]
    end

    def generate_answer_key
      answer_key = {}
      @questions.each do |question|
        answer_key[question.id] = question.answer_id
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
        correct_answer = answer_key[question_id]

        if selected_choice == correct_answer
          correct_answers_count += 1
        else
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
      @params.require(:submission).permit(:status, :seed, answers: [:question_id, :selected_choice])
    end
end
