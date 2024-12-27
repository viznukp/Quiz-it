# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz)
    @question = build(:question, quiz: @quiz)
  end

  def test_question_cant_be_empty
    @question.question = ""
    assert @question.invalid?

    assert_includes @question.errors.full_messages, "Question can't be blank"
  end

  def test_question_count_increases_on_saving
    assert_difference ["Question.count"] do
      create(:question)
    end
  end

  def test_question_count_decreases_on_deleting
    question = create(:question)
    assert_difference ["Question.count"], -1 do
      question.destroy!
    end
  end
end
