# frozen_string_literal: true

class SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[create result ]

  def create
    EvaluationService.new(params).process!
    render_notice(t("submission_successfully_saved"))
  end

  def index
    filtered_submissions = SubmissionFilterService.new(params).filter_submissions
    @pagination_metadata, @paginated_submissions = PaginationService.new(params, filtered_submissions).paginate
  end

  def result
    quiz = Quiz.find_by!(slug: params[:slug])
    user = User.find(params[:user_id])
    result = ResultService.new.generate_result(Submission.find_by!(user:, quiz:))
    render_json(result)
  end
end
