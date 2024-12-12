# frozen_string_literal: true

class SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[create result check ]
  before_action :load_quiz, only: %i[create index result check]
  before_action :load_user, only: %i[create result check]

  def create
    existing_submission = Submission.find_by(user: @user, quiz: @quiz)
    render_error(t("user_already_attempted_quiz"), :conflict) and return if existing_submission

    submission = Submission.new(
      user: @user, quiz: @quiz, status: submission_params[:status],
      answers: submission_params[:answers])
    submission = EvaluationService.new().evaluate_submission(submission)
    submission.save!

    render_notice(t("submission_successfully_saved"))
  end

  def index
    filtered_submissions = SubmissionFilterService.new(params).filter_submissions
    @pagination_metadata, @paginated_submissions = PaginationService.new(params, filtered_submissions).paginate
  end

  def result
    result = ResultService.new.generate_result(Submission.find_by!(user: @user, quiz: @quiz))
    render_json(result)
  end

  def check
    submission = Submission.find_by(user: @user, quiz: @quiz)

    if submission
      render_error(t("user_already_attempted_quiz"), :conflict)
    else
      render_json({ access: "permitted" })
    end
  end

  private

    def submission_params
      params.require(:submission).permit(:status, answers: [:question_id, :selected_choice])
    end

    def load_quiz
      @quiz = Quiz.find_by!(slug: params[:slug])
    end

    def load_user
      @user = User.find(params[:user_id])
    end
end
