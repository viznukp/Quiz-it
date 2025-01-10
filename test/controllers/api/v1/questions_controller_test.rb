# frozen_string_literal: true

require "test_helper"

class Api::V1::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz, creator: @user)
    @question = build(:question, quiz: @quiz)
    @headers = headers(@user)
  end

  def test_should_create_valid_question
    post api_v1_questions_path,
      params: {
        question: {
          question: "Sample question",
          options: { options: [{ id: 1, option: "optionA" }, { id: 2, option: "optionB" }] },
          answer_id: 2
        },
        slug: @quiz.slug
      },
      headers: @headers

    assert_response :success
  end

  def test_should_show_single_question
    @question.save!
    get api_v1_question_path(@question.id),
      params: { slug: @quiz.slug },
      headers: @headers

    assert_response :success
  end

  def test_should_update_quiz
    @question.save!
    new_question = "New question"
    put api_v1_question_path(@question.id),
      params: {
        question: { question: new_question }
      },
      headers: @headers

    assert_response :success
    updated_question = Question.find(@question.id).question
    assert_equal new_question, updated_question
  end

  def test_should_destroy_question
    @question.save!

    assert_difference "Question.count", -1 do
      delete api_v1_question_path(@question.id), headers: @headers
      assert_response :success
    end
  end
end
