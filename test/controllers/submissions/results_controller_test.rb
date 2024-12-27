# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Submissions::ResultsControllerTest < ActionDispatch::IntegrationTest
  # def test_should_show_result
  #   standard_user = create(:user, user_type: "standard")
  #   submission = create(:submission, user: standard_user)
  #   result = ResultService.new.generate_result(submission)
  #   get result_submission_path(slug: submission.quiz.slug),
  #     headers: headers(standard_user, { "X-Standard-Email": standard_user.email })

  #   assert_response :success

  #   response_result = response.parsed_body
  #   assert_equal response_result["correct_answers_count"], result[:correct_answers_count]
  #   assert_equal response_result["total_questions"], result[:total_questions]
  #   assert_equal response_result["wrong_answers_count"], result[:wrong_answers_count]
  # end
end
