# frozen_string_literal: true

class QuizCloneService
  include Pundit::Authorization

  def initialize(quiz, params)
    @quiz = quiz
    @params = params
  end

  def process!
    clone
  end

  private

    def clone
      cloned_quiz = @quiz.deep_clone include: :questions
      cloned_quiz.questions_count = 0
      cloned_quiz.submissions_count = 0
      cloned_quiz.name = @params[:name]
      cloned_quiz.save!
    end
end
