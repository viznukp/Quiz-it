# frozen_string_literal: true

require "test_helper"

class Api::V1::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    @headers = headers(user)
    @redirection = build(:redirection)
  end

  def test_should_successfully_create_redirection
    assert_difference "Redirection.count", 1 do
      post api_v1_redirections_path,
        params: { redirection: { source: @redirection.source, destination: @redirection.destination } },
        headers: @headers
      assert_response :success
    end
  end

  def test_should_successfully_delete_redirection
    @redirection.save!
    assert_difference "Redirection.count", -1 do
      delete api_v1_redirection_path(@redirection.id), headers: @headers
      assert_response :success
    end
  end

  def test_should_successfully_update_redirection
    @redirection.save!
    updated_source = @redirection.source + "/updated"
    put api_v1_redirection_path(@redirection.id),
      params: { redirection: { source: updated_source } },
      headers: @headers
    assert_response :success
  end

  def test_should_list_all_redirections
    redirection_count = 5
    create_list(:redirection, redirection_count)
    get api_v1_redirections_path, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_redirections_ids = response_json["redirections"].pluck("id")

    assert_equal Redirection.order(:id).pluck(:id), response_redirections_ids.sort
    assert_equal response_redirections_ids.length, redirection_count
  end
end
