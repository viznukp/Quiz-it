# frozen_string_literal: true

class SubmissionsController < ApplicationController
  def create
    user = User.find_by!(email: submission_params[:email])
    quiz = Quiz.find_by!(slug: submission_params[:quiz_slug])

    submission = Submission.new(user:, quiz:, status: submission_params[:status], answers: submission_params[:answers])
    submission = EvaluationService.new().evaluate_submission(submission)
    submission.save!

    render_notice(t("submission_successfully_saved"))
  end

  def show
    @submissions = Submission.includes(:user).joins(:quiz).where(quizzes: { slug: params[:slug] })
  end

  def result
    user = User.find_by!(email: request.headers["X-Auth-Email"])
    quiz = Quiz.find_by!(slug: params[:slug])

    submission = Submission.find_by(user:, quiz:)
    result = ResultService.new.generate_result(submission)

    render_json(result)
  end

  private

    def submission_params
      params.require(:submission).permit(:email, :quiz_slug, :status, answers: [:question_id, :selected_choice])
    end
end
