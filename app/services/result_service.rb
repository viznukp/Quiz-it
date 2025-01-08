# frozen_string_literal: true

class ResultService
  def initialize(params)
    @params = params
  end

  def process!
    @submission = fetch_submission
    @questions = shuffle_questions_and_options
    build_result
  end

  private

    def fetch_submission
      user = User.find(@params[:user_id])
      @quiz = Quiz.find_by!(slug: @params[:submission_slug])
      Submission.find_by!(user:, quiz: @quiz)
    end

    def shuffle_questions_and_options
      seed = @submission.seed
      questions = @quiz.questions.order(:created_at).shuffle(random: Random.new(seed))
      questions.each do | question |
        question.options["entries"] = question.options["entries"].shuffle(random: Random.new(seed))
      end
      questions
    end

    def build_result
      @submission.attributes
        .slice("correct_answers_count", "wrong_answers_count", "unanswered_count")
        .merge({
          quiz_name: @quiz.name,
          total_questions: @questions.count,
          questions: add_submitted_answer_to_each_question
        })
    end

    def add_submitted_answer_to_each_question
      @questions.map do |question|
        question_hash = question.attributes.slice("id", "question")
        question_hash["options"] = question.options["entries"]
        question_hash["correct_answer_id"] = question.answer_id
        question_hash["user_selection_id"] = find_user_choice(question)
        question_hash
      end
    end

    def find_user_choice(question)
      @submission.answers.find { |answer| answer["question_id"] == question.id.to_s }&.dig("selected_choice")
    end
end
