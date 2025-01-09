
# frozen_string_literal: true

require "test_helper"

class QuizFilterServiceTest < ActionDispatch::IntegrationTest
  def setup
    category_1 = create(:category, name: "Math", sort_order: 1)
    category_2 = create(:category, name: "Science", sort_order: 2)
    @quiz_1 = create(:quiz, name: "Math quiz", category: category_1)
    @quiz_2 = create(:quiz, name: "Science Quiz", category: category_2)
    create(:question, quiz: @quiz_1)
    @quiz_1.update!(status: "published")
  end

  def test_should_filter_by_quiz_name
    @result = filter_quizzes({ quiz_name: @quiz_1.name })
    assert_correctness
  end

  def test_should_filter_by_quiz_category
    @result = filter_quizzes({ category: @quiz_1.category.name })
    assert_correctness
  end

  def test_should_filter_by_quiz_status
    @result = filter_quizzes({ status: @quiz_1.reload.status })
    assert_correctness
  end

  def test_should_filter_by_quiz_status
    @quiz_2.update!(accessibility: "hidden")
    @result = filter_quizzes({ accessibility: "discoverable" })
    assert_correctness
  end

  def test_should_filter_by_order_of_category
    @result = filter_quizzes({ order_by_category: true })
    result_quizzes = @result[:quizzes]
    assert_equal result_quizzes.count, Quiz.count
    assert_equal result_quizzes.first.name, @quiz_1.name
  end

  private

    def filter_quizzes(filter)
      QuizFilterService.new(filter, Quiz).process!
    end

    def assert_correctness
      result_quizzes = @result[:quizzes]
      assert_equal result_quizzes.count, 1
      assert_equal result_quizzes.first.name, @quiz_1.name
    end
end
