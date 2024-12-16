# frozen_string_literal: true

class ResultService
  def initialize(params)
    @params = params
  end

  def process!
    submission = fetch_submission
    build_result(submission)
  end

  private

    def fetch_submission
      user = User.find(@params[:user_id])
      @quiz = Quiz.find_by!(slug: @params[:submission_slug])
      Submission.find_by!(user:, quiz: @quiz)
    end

    def build_result(submission)
      questions = @quiz.questions

      submission.attributes
        .slice("correct_answers_count", "wrong_answers_count", "unanswered_count")
        .merge({
          quiz_name: @quiz.name,
          total_questions: questions.count,
          questions: add_submitted_answer_to_each_question(questions, submission)
        })
    end

    def add_submitted_answer_to_each_question(questions, submission)
      questions.map do |question|
        question_hash = question.attributes.slice("id", "question", "options", "answer_index")
        question_hash["correct_answer_index"] = question.answer_index
        question_hash["user_selection_index"] = find_user_selected_choice(question, submission)
        question_hash
      end
    end

    def find_user_selected_choice(question, submission)
      submission.answers.find { |answer| answer["question_id"] == question.id.to_s }&.dig("selected_choice")
    end
end
