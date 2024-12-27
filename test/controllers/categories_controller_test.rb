# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
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

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete category_path(@category.id), headers: @headers
      assert_response :success
    end
  end

  def test_should_update_category_name
    updated_name = @category.name + "updated"
    put category_path(@category.id), params: { category: { name: updated_name } }, headers: @headers
    assert_response :success
    updated_category = Category.find(@category.id)

    assert_equal updated_name, updated_category.name
  end

  def test_should_successfully_rearrange_categories
    categories = create_list(:category, 3)
    updated_order = [
      { id: categories[2].id, sort_order: 1 },
      { id: categories[0].id, sort_order: 2 },
      { id: categories[1].id, sort_order: 3 }
    ]

    put bulk_update_categories_path,
      params: { categories: { order: updated_order } },
      headers: @headers

    assert_response :success

    categories.each(&:reload)
    assert_equal [1, 2, 3], categories.sort_by(&:updated_at).pluck(:sort_order)
  end
end
