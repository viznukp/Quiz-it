# frozen_string_literal: true

require "test_helper"

class QuizCloneServiceTest < ActionDispatch::IntegrationTest
  def setup
    @quiz = create(:quiz, submissions_count: 5)
    @questions_count = 5
    create_list(:question, @questions_count, quiz: @quiz)
    @new_name = @quiz.name + "cloned"
  end

  def test_should_successfully_clone_quiz
    assert_difference "Quiz.count", 1 do
      clone_quiz
    end
    assert_not_nil cloned_quiz
    assert_equal cloned_quiz.name, @new_name
  end

  def test_should_not_clone_associated_submissions
    assert_difference "Submission.count", 0 do
      clone_quiz
    end

    assert_equal cloned_quiz.submissions_count, 0
  end

  def test_should_clone_associated_questions
    clone_quiz
    assert_equal @questions_count, cloned_quiz.questions_count
    assert_equal @quiz.questions.count, cloned_quiz.questions.count
    assert_equal cloned_quiz.questions_count, cloned_quiz.questions.count
  end

  private

    def clone_quiz
      QuizCloneService.new(@quiz, clone_params).process!
    end

    def clone_params
      ActionController::Parameters.new({ name: @new_name })
    end

    def cloned_quiz
      Quiz.find_by(name: @new_name)
    end
end
