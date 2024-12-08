# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    create(:category)
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
end
