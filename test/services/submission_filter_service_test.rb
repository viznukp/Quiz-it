
# frozen_string_literal: true

require "test_helper"

class SubmissionFilterServiceTest < ActionDispatch::IntegrationTest
  def setup
    quiz_creator = create(:user)
    @quiz = create(:quiz, creator: quiz_creator)
    @headers = headers(quiz_creator)
    @user1 = create(:user, first_name: "Alex", last_name: "Smith", email: "first_user@example.com")
    user2 = create(:user, first_name: "Sam", last_name: "Smith", email: "second_user@example.com")
    @user1_submission = create(:submission, user: @user1, quiz: @quiz, status: "completed")
    create(:submission, user: user2, quiz: @quiz, status: "incomplete")
  end

  def assert_correctness
    assert_response :success
    response_submissions = response.parsed_body["submissions"]
    assert_equal 1, response_submissions.size
    assert_equal response_submissions.first["submission"]["id"], @user1_submission.id
  end

  def test_should_filter_by_user_name
    get submissions_path, params: { filters: { name: @user1.first_name }, slug: @quiz.slug }, headers: @headers
    assert_correctness
  end

  def test_should_filter_by_user_email
    get submissions_path, params: { filters: { email: @user1.email }, slug: @quiz.slug }, headers: @headers
    assert_correctness
  end

  def test_should_filter_by_user_status
    get submissions_path, params: { filters: { status: @user1_submission.status }, slug: @quiz.slug }, headers: @headers
    assert_correctness
  end
end
