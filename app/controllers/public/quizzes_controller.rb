class Public::QuizzesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    filtered_quizzes, = QuizFilterService.new(filter_params.merge(status: "published", accessibility: "discoverable"), nil).process!
    @pagination_metadata, @paginated_quizzes = PaginationService.new(params, filtered_quizzes).process!
    @organization = Organization.first
  end

  def show
    @quiz = Quiz.find_by!(slug: params[:slug])
    render_error("Invalid link") if @quiz.draft?
  end

  private

    def filter_params
      params[:filters] || {}
    end

end
