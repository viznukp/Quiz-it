# frozen_string_literal: true

require "test_helper"

class SubmissionTest < ActiveSupport::TestCase
  def setup
    user = create(:user)
    quiz = create(:quiz)
    @submission = build(:submission, user:, quiz:)
  end

  def test_submission_cannot_be_saved_without_user
    @submission.user = nil
    assert_not @submission.valid?
    assert_includes @submission.errors.full_messages, "User can't be blank"
  end

  def test_submission_cannot_be_saved_without_quiz
    @submission.quiz = nil
    assert_not @submission.valid?
    assert_includes @submission.errors.full_messages, "Quiz can't be blank"
  end

  def test_total_questions_cannot_be_negative
    @submission.total_questions = -1
    assert @submission.invalid?
    assert_includes @submission.errors.full_messages, "Total questions must be greater than or equal to 0"
  end

  def test_correct_answers_count_cannot_be_negative
    @submission.correct_answers_count = -1
    assert @submission.invalid?
    assert_includes @submission.errors.full_messages, "Correct answers count must be greater than or equal to 0"
  end

  def test_wrong_answers_count_cannot_be_negative
    @submission.wrong_answers_count = -1
    assert @submission.invalid?
    assert_includes @submission.errors.full_messages, "Wrong answers count must be greater than or equal to 0"
  end

  def test_unanswered_count_cannot_be_negative
    @submission.unanswered_count = -1
    assert @submission.invalid?
    assert_includes @submission.errors.full_messages, "Unanswered count must be greater than or equal to 0"
  end

  def test_submission_count_increases_on_saving
    assert_difference ["Submission.count"] do
      create(:submission)
    end
  end

  def test_submission_count_decreases_on_deleting
    submission = create(:submission)
    assert_difference ["Submission.count"], -1 do
      submission.destroy!
    end
  end
end
