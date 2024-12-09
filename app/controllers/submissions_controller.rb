# frozen_string_literal: true

class SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[create result check ]

  def create
    user = User.find_by!(email: submission_params[:email])
    quiz = Quiz.find_by!(slug: submission_params[:quiz_slug])

    existing_submission = Submission.find_by(user:, quiz:)
    render_error(t("user_already_attempted_quiz"), :conflict) and return if existing_submission

    submission = Submission.new(user:, quiz:, status: submission_params[:status], answers: submission_params[:answers])
    submission = EvaluationService.new().evaluate_submission(submission)
    submission.save!

    render_notice(t("submission_successfully_saved"))
  end

  def index
    filtered_submissions = SubmissionFilterService.new(params).filter_submissions
    @pagination_metadata, @paginated_submissions = PaginationService.new(params, filtered_submissions).paginate
    @quiz = Quiz.find_by!(slug: params[:slug])
  end

  def result
    user = User.find_by!(email: request.headers["X-Standard-Email"])
    quiz = Quiz.find_by!(slug: params[:slug])

    submission = Submission.find_by(user:, quiz:)
    result = ResultService.new.generate_result(submission)

    render_json(result)
  end

  def check
    quiz = Quiz.find_by!(slug: params[:slug])
    user = User.find_by!(email: request.headers["X-Standard-Email"])

    submission = Submission.find_by(user:, quiz:)

    if submission
      render_error(t("user_already_attempted_quiz"), :conflict)
    else
      render_json({ access: "permitted" })
    end
  end

  private

    def submission_params
      params.require(:submission).permit(:email, :quiz_slug, :status, answers: [:question_id, :selected_choice])
    end
end
