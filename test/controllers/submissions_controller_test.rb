# frozen_string_literal: true

require "test_helper"

class SubmissionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @submission = build(:submission, user: @user, quiz: @quiz)
    @headers = headers(@user)
  end

  def test_should_list_all_submissions
    submission_count = 5
    create_list(:submission, submission_count, quiz: @quiz)

    get submissions_path, params: { slug: @quiz.slug }, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_submission_ids = response_json["submissions"].map { |entry| entry["submission"]["id"] }
    expected_submission_count = response_count_considering_pagination(submission_count)

    assert_equal Submission.order(:id).limit(default_page_size).pluck(:id), response_submission_ids.sort
    assert_equal response_submission_ids.length, expected_submission_count
  end

  def test_should_create_valid_submission_entry
    @quiz.save!
    question = create(:question, quiz: @quiz)
    assert_difference "Submission.count", 1 do
      post submissions_path, params: {
        submission: {
          email: @user.email,
          quiz_slug: @quiz.slug,
          status: "completed",
          answers: [{ question_id: question.id, answer_index: 1 }]
        }
      }, headers: @headers

      assert_response :success
    end
  end

  def test_should_show_result
    standard_user = create(:user, user_type: "standard")
    submission = create(:submission, user: standard_user)
    result = ResultService.new.generate_result(submission)
    get result_submission_path(slug: submission.quiz.slug),
      headers: headers(standard_user, { "X-Standard-Email": standard_user.email })

    assert_response :success

    response_result = response.parsed_body
    assert_equal response_result["correct_answers_count"], result[:correct_answers_count]
    assert_equal response_result["total_questions"], result[:total_questions]
    assert_equal response_result["wrong_answers_count"], result[:wrong_answers_count]
  end
end
