
# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Quizzes::ClonesControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user, user_type: "admin")
    @quiz = create(:quiz, creator: user)
    @headers = headers(user)
  end

  def test_should_successfully_clone_quiz
    cloned_quiz_name = @quiz.name + "cloned"

    assert_difference "Quiz.count", 1 do
      post quiz_clone_path(quiz_slug: @quiz.slug), params: { quiz: { name: cloned_quiz_name } }, headers: @headers
      assert_response :success
    end
  end
end
