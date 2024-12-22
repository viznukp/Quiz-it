# frozen_string_literal: true

class SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[create result_email]

  def create
    EvaluationService.new(params).process!
    render_notice(t("submission_successfully_saved"))
  end

  def result_email
    ResultMailer.result_email().deliver_now
    render_notice("mail sent successfully")
  end

  def index
    @quiz = Quiz.find_by!(slug: params[:slug])
    filtered_submissions = SubmissionFilterService.new(params).process!
    @pagination_metadata, @paginated_submissions = PaginationService.new(params, filtered_submissions).process!
  end
end
