# frozen_string_literal: true

class ResultMailer < ApplicationMailer
  def result_email(submission_id)
    @submission = Submission.find_by(id: submission_id)

    return unless @submission

    @user = @submission.user
    @quiz = @submission.quiz
    mail(to: @user.email, subject: "#{@quiz.name} submitted by #{@user.name}")
  end
end
