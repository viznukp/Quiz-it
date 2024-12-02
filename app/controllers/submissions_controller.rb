# frozen_string_literal: true

class SubmissionsController < ApplicationController
  def index
    @submissions = Submission.includes(:user).all
  end

  def create
    user = User.find_by!(email: submission_params[:email])
    quiz = Quiz.find_by!(slug: submission_params[:quiz_slug])

    submission = Submission.new(user:, quiz:, status: submission_params[:status], answers: submission_params[:answers])
    submission.save!

    render_notice(t("submission_successfully_saved"))
  end

  private

    def submission_params
      params.require(:submission).permit(:email, :quiz_slug, :status, answers: [:question_id, :selected_choice])
    end
end
