# frozen_string_literal: true

require "test_helper"

class EvaluationServiceTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @questions_count = 3
    @questions = create_list(:question, @questions_count, quiz: @quiz)
  end

  def test_should_create_submission
    assert_difference "Submission.count", 1 do
      EvaluationService.new(submission_params).process!
    end
  end

  def test_should_evaluate_correctly
    EvaluationService.new(submission_params).process!
    submission = Submission.find_by(user_id: @user.id, quiz_id: @quiz.id)
    assert_equal submission.correct_answers_count, 1
    assert_equal submission.wrong_answers_count, 1
    assert_equal submission.unanswered_count, 1
    assert_equal submission.total_questions, @questions_count
  end

  private

    def submission_params
      ActionController::Parameters.new(
        { slug: @quiz.slug, user_id: @user.id, submission: { answers: generate_answers, status: "completed", seed: 0 } }
      )
    end

    def generate_answers
      [
        { question_id: @questions[0].id, selected_choice: @questions[0].answer_id },
        { question_id: @questions[1].id, selected_choice: select_wrong_answer(@questions[1]) }
      ]
    end

    def select_wrong_answer(question)
      options_count = question.options["entries"].size
      correct_answer = question.answer_id
      correct_answer == options_count ? options_count - 1 : options_count
    end
end
