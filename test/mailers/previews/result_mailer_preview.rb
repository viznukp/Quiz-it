# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/result_mailer
class ResultMailerPreview < ActionMailer::Preview
  def result_email
    ResultMailer.result_email(Submission.first.id)
  end
end
