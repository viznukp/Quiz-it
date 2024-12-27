class Public::QuizzesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_organization, only: :index

  def index
    filtered_quizzes, = QuizFilterService.new(filter_params, nil).process!
    @pagination_metadata, @paginated_quizzes = PaginationService.new(params, filtered_quizzes).process!
  end

  def show
    @quiz = Quiz.find_by!(slug: params[:slug])
    render_error(t("invalid_link")) if @quiz.draft?
  end

  private

    def filter_params
      filters = params[:filters] || {}
      filters.merge(status: "published", accessibility: "discoverable", order_by_category: "true")
    end

    def load_organization
      @organization = Organization.first
    end

end
