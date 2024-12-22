# frozen_string_literal: true

class ResultMailer < ApplicationMailer
  def result_email
    @receiver = User.first
    return unless @receiver

    mail(to: @receiver.email, subject: "Quiz result")
  end
end
