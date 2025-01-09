
# frozen_string_literal: true

require "test_helper"

class SubmissionFilterServiceTest < ActionDispatch::IntegrationTest
  def setup
    @quiz = create(:quiz)
    @user1 = create(:user, first_name: "Alex", last_name: "Smith", email: "first_user@example.com")
    user2 = create(:user, first_name: "Sam", last_name: "Smith", email: "second_user@example.com")
    @user1_submission = create(:submission, user: @user1, quiz: @quiz, status: "completed")
    create(:submission, user: user2, quiz: @quiz, status: "incomplete")
  end

  def test_should_filter_by_user_name
    @result = filter_submissions({ slug: @quiz.slug, filters: { name: @user1.name } })
    assert_correctness
  end

  def test_should_filter_by_email
    @result = filter_submissions({ slug: @quiz.slug, filters: { email: @user1.email } })
    assert_correctness
  end

  def test_should_filter_by_submission_status
    @result = filter_submissions({ slug: @quiz.slug, filters: { status: "completed" } })
    assert_correctness
  end

  private

    def filter_submissions(filter)
      SubmissionFilterService.new(submission_params(filter)).process!
    end

    def submission_params(filters)
      ActionController::Parameters.new(filters)
    end

    def assert_correctness
      assert_equal @result.count, 1
      assert_equal @result.first.user.name, @user1.name
    end
end
