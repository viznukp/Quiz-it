# frozen_string_literal: true

class QuizFilterService
  include Pagy::Backend

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

    page_size = filter_params[:page_size]
    page = PaginationService.new(
      filter_params[:page],
      page_size,
      quizzes.count
    ).calculate_page_number

    pagy(quizzes, limit: page_size, page:)
  end

  def filter_params
    params.fetch(:filters, {}).permit(:quiz_name, :status, :category, :page_size, :page)
  end
end
