# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @quiz = create(:quiz, category: @category)
    user = create(:user)
    @headers = headers(user)
  end

  def test_should_list_all_categories
    get categories_path, headers: @headers
    assert_response :success
    response_category_ids = response.parsed_body["categories"].pluck("id")
    expected_category_ids = Category.all.pluck(:id)

    assert_equal response_category_ids.sort, expected_category_ids.sort
  end

  def test_should_create_category
    post categories_path, params: { category: { name: "example category" } }, headers: @headers
    assert_response :success
  end

  def test_should_update_category_name
    updated_name = @category.name + "updated"
    put category_path(@category.id), params: { category: { name: updated_name } }, headers: @headers
    assert_response :success
    updated_category = Category.find(@category.id)

    assert_equal updated_name, updated_category.name
  end

  def test_associated_quizzes_should_not_be_deleted_when_category_is_deleted
    delete category_path(@category.id), headers: @headers
    assert_response :success

    assert_nil Category.find_by(id: @category.id)
    assert_not_nil Quiz.find(@quiz.id)
  end

  def test_general_category_should_be_created_when_last_available_category_is_deleted
    assert_difference "Category.count", 0 do
      delete category_path(@category.id), headers: @headers
      assert_response :success
    end
  end
end
