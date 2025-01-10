# frozen_string_literal: true

require "test_helper"

class DeleteCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category, name: "Math")
    @replacement_category = create(:category, name: "Physics")
  end

  def test_should_delete_category
    params = create_params(@category, @replacement_category)

    assert_difference "Category.count", -1 do
      DeleteCategoryService.new(@category, params).process!
    end
  end

  def test_should_move_quizzes_to_specified_category
    category_to_be_deleted_quiz_count = 3
    initial_replacement_category_quiz_count = @replacement_category.quizzes.count
    create_list(:quiz, category_to_be_deleted_quiz_count, category: @category)

    params = create_params(@category, @replacement_category)

    DeleteCategoryService.new(@category, params).process!
    assert_equal @replacement_category.quizzes.count,
      initial_replacement_category_quiz_count + category_to_be_deleted_quiz_count
  end

  def test_should_create_general_category_if_replacement_category_is_not_provided
    assert_nil Category.find_by(name: "General")
    create_list(:quiz, 3, category: @category)
    DeleteCategoryService.new(@category, create_params(@category, nil)).process!

    assert_not_nil Category.find_by(name: "General")
  end

  private

    def create_params(category, replacement)
      ActionController::Parameters.new(
        { id: category&.id || nil, replacement_category_id: replacement&.id || nil }
      )
    end
end
