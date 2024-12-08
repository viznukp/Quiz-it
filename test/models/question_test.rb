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

  def test_minimum_number_of_options
    @question.options = ["option A"]
    assert @question.invalid?
    assert_includes @question.errors.full_messages,
      "Question must have at least #{Question::MIN_OPTIONS_COUNT} options"
  end

  def test_maximum_number_of_options
    @question.options = (1..Question::MAX_OPTIONS_COUNT + 1).map { |i| "option #{i}" }
    assert @question.invalid?
    assert_includes @question.errors.full_messages,
      "Question can have at most #{Question::MAX_OPTIONS_COUNT} options"
  end

  def test_answer_index_cannot_be_greater_than_number_of_options
    @question.options = ["option A", "option B"]
    @question.answer_index = 3
    assert @question.invalid?
    assert_includes @question.errors.full_messages,
      "Answer index cannot be grater than number of options"
  end

  def test_options_cannot_have_empty_values
    @question.options = ["option A", ""]
    assert @question.invalid?
    assert_includes @question.errors.full_messages,
      "Options cannot contain empty values"
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
