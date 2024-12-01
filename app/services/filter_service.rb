# frozen_string_literal: true

class FilterService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def filter_quizzes
    quizzes = Quiz.all

    if filter_params[:category].present?
      quizzes = quizzes.where(category: filter_params[:category])
    end

    if filter_params[:status].present?
      quizzes = quizzes.where(status: filter_params[:status])
    end

    if filter_params[:quiz_name].present?
      quizzes = quizzes.where("LOWER(name) LIKE ?", "%#{filter_params[:quiz_name].downcase}%")
    end

    quizzes
  end

  def filter_params
    params.fetch(:filters, {}).permit(:quiz_name, :status, :category)
  end
end
