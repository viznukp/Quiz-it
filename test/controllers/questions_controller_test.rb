# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz, creator: @user)
    @question = build(:question, quiz: @quiz)
    @headers = headers(@user)
  end

  def test_should_create_valid_question
    post questions_path,
      params: {
        question: {
          question: "Sample question",
          options: %w[optionA optionB optionC optionD],
          answer_index: 2,
          quiz_slug: @quiz.slug
        }
      },
      headers: @headers

    assert_response :success
  end

  def test_should_show_single_question
    @question.save!
    get question_path(@question.id),
      params: { slug: @quiz.slug },
      headers: @headers

    assert_response :success
  end

  def test_should_update_quiz
    @question.save!
    new_question = "New question"
    put question_path(@question.id),
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
      delete question_path(@question.id), headers: @headers
      assert_response :success
    end
  end

  def test_should_clone_question
    @question.save!
    get question_clone_path(@question.id), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    cloned_question = response_json["question"]
    cloned_question_quiz_name = response_json["quiz"]
    assert_equal @question.question, cloned_question["question"]
    assert_equal @question.quiz.name, cloned_question_quiz_name
  end
end
