# frozen_string_literal: true

require "test_helper"

class Api::V1::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)
  end

  def test_should_list_organization
    get api_v1_organization_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    expected_name = @organization.name

    assert_equal expected_name, response_json["organization"]
  end

  def test_should_update_organization
    new_name = "Updated name"
    put api_v1_organization_path,
      params: { organization: { name: new_name } },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", entity: "Organization"), response_json["notice"]
    updated_name = Organization.find(@organization.id).name
    assert_equal updated_name, new_name
  end
end
