# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Public::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz, creator: @user)
    @question = create(:question, quiz: @quiz)
    @quiz.update!(status: "published", accessibility: "discoverable")
    @headers = headers(@user)
  end

  def test_should_show_quiz_for_attempt_without_answers
    get public_question_path(slug: @quiz.slug), params:{user_id: @user.id}, headers: @headers
    assert_response :success
    response_quiz = response.parsed_body["quiz"]
    response_quiz_questions = response_quiz["questions"]

    response_quiz_questions.each do |question|
      assert_not question.has_key?("answer_id")
    end
  end

  def test_should_not_show_quiz_if_user_has_already_attempted_the_quiz
    create(:submission, quiz: @quiz, user: @user, answers: {question_id: @question.id, selected_choice: 1} )
    get public_question_path(slug: @quiz.slug), params:{user_id: @user.id}, headers: @headers
    assert_response :conflict

    error_message = JSON.parse(response.body)["error"]
    assert_equal I18n.t("user_already_attempted_quiz"), error_message
  end

end
