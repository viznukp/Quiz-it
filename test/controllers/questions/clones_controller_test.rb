# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Questions::ClonesControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    quiz = create(:quiz, creator: user)
    @question = create(:question, quiz:)
    @headers = headers(user)
  end

  def test_should_successfully_clone_question
    assert_difference "Question.count", 1 do
      post question_clone_path(@question.id), headers: @headers
      assert_response :success
    end
  end
end
