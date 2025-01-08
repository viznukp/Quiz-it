# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @question = create(:question, quiz: @quiz)
    @headers = headers(@user)
  end

  def create_submission(user, quiz, question, headers)
    post api_v1_submissions_path, params: {
      submission: {
        status: "completed",
        answers: [{ question_id: question.id, selected_choice: 1 }]
      },
      user_id: user.id,
      slug: quiz.slug
    }, headers:
  end

  def test_should_list_all_submissions
    submission_count = 5
    create_list(:submission, submission_count, quiz: @quiz)

    get api_v1_submissions_path, params: { slug: @quiz.slug }, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_submission_ids = response_json["submissions"].map { |entry| entry["submission"]["id"] }
    expected_submission_count = response_count_considering_pagination(submission_count)

    assert_equal Submission.order(:id).limit(default_page_size).pluck(:id), response_submission_ids.sort
    assert_equal response_submission_ids.length, expected_submission_count
  end

  def test_should_create_valid_submission_entry
    question = create(:question, quiz: @quiz)
    assert_difference "Submission.count", 1 do
      create_submission(@user, @quiz, question, @headers)
      assert_response :success
    end
  end

  def test_user_can_have_only_one_submission_per_quiz
    create_submission(@user, @quiz, @question, @headers)
    assert_response :success

    assert_difference "Submission.count", 0 do
      create_submission(@user, @quiz, @question, @headers)
    end
  end
end
