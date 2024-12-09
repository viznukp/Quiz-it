# frozen_string_literal: true

require "test_helper"

class EvaluationServiceTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @questions = create_list(:question, 5, quiz: @quiz)
    @answers = [
      { "question_id" => @questions[0].id, "selected_choice" => @questions[0].answer_index },
      { "question_id" => @questions[1].id, "selected_choice" => @questions[1].answer_index },
      { "question_id" => @questions[2].id, "selected_choice" => get_incorrect_answer_index(@questions[2]) },
      { "question_id" => @questions[3].id, "selected_choice" => get_incorrect_answer_index(@questions[3]) },
      { "question_id" => @questions[4].id }
    ]
    @submission = create(:submission, quiz: @quiz, user: @user, answers: @answers)
  end

  def test_should_evaluate_submission_correctly
    result_submission = EvaluationService.new.evaluate_submission(@submission)

    assert_equal result_submission.correct_answers_count, 2
    assert_equal result_submission.wrong_answers_count, 2
    assert_equal result_submission.unanswered_count, 1
    assert_equal result_submission.total_questions, @quiz.questions.count
  end
end
