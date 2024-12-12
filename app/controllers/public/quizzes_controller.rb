class Public::QuizzesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    filtered_quizzes, = QuizFilterService.new(filter_params.merge(status: "published")).filter_quizzes
    @pagination_metadata, @paginated_quizzes = PaginationService.new(params, filtered_quizzes).paginate
    @organization = Organization.first
  end

  private

    def filter_params
      params[:filters] || {}
    end

end
