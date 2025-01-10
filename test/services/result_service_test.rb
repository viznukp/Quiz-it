# frozen_string_literal: true

require "test_helper"

class ResultServiceTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
    @questions_count = 3
    @questions = create_list(:question, @questions_count, quiz: @quiz)
    @answers = generate_answers
    @submission = Submission.create(
      user_id: @user.id,
      quiz_id: @quiz.id,
      total_questions: @questions_count,
      correct_answers_count: 1,
      wrong_answers_count: 1,
      unanswered_count: 1,
      answers: @answers,
      status: "completed",
      seed: 0
    )
  end

  def test_should_return_correct_result
    result = ResultService.new(result_params).process!
    assert_equal result["correct_answers_count"], 1
    assert_equal result["wrong_answers_count"], 1
    assert_equal result["unanswered_count"], 1
    assert_equal result[:total_questions], @questions_count

    @answers.each do |answer|
      assert_equal answer[:selected_choice],
        find_question(result[:questions], answer[:question_id])["user_selection_id"]
    end
  end

  private

    def result_params
      ActionController::Parameters.new(
        { submission_slug: @quiz.slug, user_id: @user.id }
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

    def find_question(questions, id)
      questions.find { |question| question["id"] == id }
    end
end
