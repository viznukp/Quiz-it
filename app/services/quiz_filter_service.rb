# frozen_string_literal: true

class QuizFilterService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def filter_quizzes
    quizzes = Quiz.all

    if params[:category].present?
      quizzes = quizzes
        .joins(:category)
        .where("LOWER(categories.name) LIKE ?", "%#{params[:category].downcase}%")
    end

    if params[:status].present?
      quizzes = quizzes.where(status: params[:status])
    end

    if params[:quiz_name].present?
      quizzes = quizzes.where("LOWER(quizzes.name) LIKE ?", "%#{params[:quiz_name].downcase}%")
    end

    quizzes = quizzes.order(created_at: :desc)

    result_type = params[:status] || "all"
    [quizzes, result_type]
  end
end
