# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Api::V1::Categories::OrdersControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    @headers = headers(user)
  end

  def test_should_successfully_rearrange_categories
    (1...3).each do |position|
      create(:category, sort_order: position)
    end

    first_category = Category.order(:sort_order).first

    put api_v1_category_order_path(first_category.id),
      params: { position: 3 },
      headers: @headers

    assert_response :success
    last_category_after_reorder = Category.order(:sort_order).last
    assert_equal first_category.id, last_category_after_reorder.id
  end
end
