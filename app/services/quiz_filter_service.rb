# frozen_string_literal: true

class QuizFilterService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def filter_quizzes
    quizzes = Quiz.all

    if filter_params[:category].present?
      quizzes = quizzes.where("LOWER(category) LIKE ?", "%#{filter_params[:category].downcase}%")
    end

    if filter_params[:status].present?
      quizzes = quizzes.where(status: filter_params[:status])
    end

    if filter_params[:quiz_name].present?
      quizzes = quizzes.where("LOWER(name) LIKE ?", "%#{filter_params[:quiz_name].downcase}%")
    end

    result_type = filter_params[:status] || "all"
    [quizzes, result_type]
  end

  def filter_params
    params.fetch(:filters, {}).permit(:quiz_name, :status, :category, :page_size, :page)
  end
end
