# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Submissions::ResultsControllerTest < ActionDispatch::IntegrationTest
  def test_should_show_result
    standard_user = create(:user, user_type: "standard")
    quiz = create(:quiz, creator: standard_user)
    question = create(:question, quiz:)
    answers = [{ question_id: question.id, selected_choice: 1 }]
    submission = create(:submission, quiz:, user: standard_user, answers:)
    headers = standard_user_headers(standard_user)
    get(
      submission_result_path(submission_slug: submission.quiz.slug),
      params: { user_id: standard_user.id }, headers:)

    assert_response :success
  end
end
