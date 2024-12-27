# frozen_string_literal: true

require "test_helper"

class ResultMailerTest < ActionMailer::TestCase
  def setup
    @user = create(:user, email: "oliver@example.com")
    @quiz = create(:quiz, name: "Sample Quiz", creator: @user)
    @submission = create(:submission, user: @user, quiz: @quiz)
  end

  def test_result_email
    email = ResultMailer.result_email(@submission.id)

    assert_emails 1 do
      email.deliver_now
    end
    assert_equal [@user.email], email.to
  end

  def test_should_not_sent_mail_without_submission
    email = ResultMailer.result_email(nil)

    assert_emails 0 do
      email.deliver_now
    end
  end
end
