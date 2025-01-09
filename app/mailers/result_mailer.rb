# frozen_string_literal: true

class ResultMailer < ApplicationMailer
  def result_email(submission_id)
    @submission = Submission.find_by(id: submission_id)

    return unless @submission

    @user = @submission.user
    @quiz = @submission.quiz
    @result = fetch_result

    mail(to: @user.email, subject: "#{@quiz.name} submitted by #{@user.name}")
  end

  private

    def fetch_result
      ResultService.new(submission_params).process!
    end

    def submission_params
      ActionController::Parameters.new(
        { submission_slug: @quiz.slug, user_id: @user.id }
      )
    end
end
