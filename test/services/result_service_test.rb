# frozen_string_literal: true

require "test_helper"

class ResultServiceTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @submission = build(:submission, user: @user, quiz: @quiz)
  end

  def test_should_produce_correct_result
    quiz = create(:quiz)
    questions = create_list(:question, 5, quiz:)

    answers = [
      { "question_id" => questions[0].id, "selected_choice" => questions[0].answer_index },
      { "question_id" => questions[1].id, "selected_choice" => questions[1].answer_index },
      { "question_id" => questions[2].id, "selected_choice" => get_incorrect_answer_index(questions[2]) },
      { "question_id" => questions[3].id, "selected_choice" => get_incorrect_answer_index(questions[3]) },
      { "question_id" => questions[4].id }
    ]

    submission = build(:submission, answers:, quiz:, user: @user)
    result = ResultService.new.generate_result(submission)
    assert_equal result[:correct_answers_count], 2
    assert_equal result[:wrong_answers_count], 2
    assert_equal result[:unanswered_count], 1
  end

  def get_incorrect_answer_index(question)
    correct = question.answer_index
    correct < question.options.count ? correct + 1 : correct - 1
  end
end
