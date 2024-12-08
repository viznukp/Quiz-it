# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @headers = headers(@user)
  end

  def test_admin_should_signup_with_valid_credentials
    post users_path, params: {
      user: {
        first_name: "Sam",
        last_name: "Smith",
        email: "sam@example.com",
        user_type: "admin",
        password: "welcome",
        password_confirmation: "welcome"
      }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("signup_successful"), response_json["notice"]
  end

  def test_admin_should_not_signup_with_invalid_credentials
    post users_path, params: {
      user: {
        first_name: "Sam",
        last_name: "Smith",
        email: "sam@example.com",
        user_type: "admin",
        password: "welcome",
        password_confirmation: "not matching confirmation"
      }
    }, headers: @headers

    assert_response :unprocessable_entity
    assert_equal "Password confirmation doesn't match Password", response.parsed_body["error"]
  end

  def test_should_create_standard_user_without_password
    email = "sam@example.com"
    post create_standard_user_users_path, params: {
      user: {
        first_name: "Sam",
        last_name: "Smith",
        email:,
        user_type: "standard"
      }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    response_auth_token = response_json["authentication_token"]
    expected_auth_token = User.find_by!(email:).authentication_token
    assert_equal expected_auth_token, response_auth_token
  end
end
