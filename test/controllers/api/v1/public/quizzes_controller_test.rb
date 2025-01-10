# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Api::V1::Public::QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, user_type: "admin")
    @category = create(:category)
    @headers = headers(@user)
  end

  def test_should_not_show_draft_quiz_for_attempt
    quiz = create(:quiz, creator: @user, category: @category, status: "draft")
    get api_v1_public_quiz_path(slug: quiz.slug), headers: @headers

    assert_response :unprocessable_entity
    error_message = JSON.parse(response.body)["error"]
    assert_equal I18n.t("invalid_link"), error_message
  end

  def test_should_not_list_unpublished_quizzes
    create_list(:quiz, 3, status: "draft", category: @category)
    quizzes_to_publish = create_list(:quiz, 5, creator: @user, status: "draft", category: @category)
    quizzes_to_publish.each do |quiz|
      create(:question, quiz:)
      quiz.update!(status: "published")
    end

    get api_v1_public_quizzes_path, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_quiz_ids = response_json["quizzes"].pluck("id")
    draft_quizzes_ids = Quiz.where(status: "draft").order(:id).pluck(:id)
    assert_empty (response_quiz_ids & draft_quizzes_ids)
  end

  def test_should_not_list_hidden_quizzes
    quizzes = create_list(:quiz, 5, creator: @user, status: "draft", category: @category)
    quizzes.each do |quiz|
      create(:question, quiz:)
      quiz.update!(status: "published")
    end

    first_quiz = quizzes[0]
    first_quiz.update!(accessibility: "hidden");

    get api_v1_public_quizzes_path, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_quiz_ids = response_json["quizzes"].pluck("id")
    assert_not_includes response_quiz_ids, first_quiz.id
  end
end
