# frozen_string_literal: true

require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, user_type: "admin")
    @headers = headers(@user)
  end

  def test_should_login_user_with_valid_credentials
    post api_v1_session_path, params: { session: { email: @user.email, password: @user.password } }, as: :json
    assert_response :success
    assert_equal @user.authentication_token, response.parsed_body["authentication_token"]
  end

  def test_should_not_login_user_with_invalid_credentials
    post api_v1_session_path, params: { session: { email: @user.email, password: @user.password + "invalid" } },
      as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal I18n.t("session.incorrect_credentials"), response_json["error"]
  end

  def test_should_respond_with_not_found_error_if_user_is_not_present
    non_existent_email = "this_email_does_not_exist_in_db@example.email"
    post api_v1_session_path, params: { session: { email: non_existent_email, password: "welcome" } }, as: :json
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "User"), response_json["error"]
  end

  def test_should_not_get_access_to_unauthorized_actions
    standard_user = create(:user, user_type: "standard")
    get api_v1_quizzes_path, headers: standard_user_headers(standard_user)

    assert_equal I18n.t("session.could_not_auth"), response.parsed_body["error"]
  end

  def test_standard_users_should_not_get_access_to_unauthorized_actions
    standard_user = create(:user, user_type: "standard")
    quiz = create(:quiz)
    get api_v1_quiz_path(slug: quiz.slug), headers: headers(standard_user)

    assert_equal I18n.t("authorization.denied"), response.parsed_body["error"]
  end

  def test_should_not_get_access_after_logging_out
    @headers.delete("X-Auth-Token")
    post api_v1_session_path, params: { session: { email: @user.email, password: "welcome" } }, headers: @headers
    assert_response :success
    delete api_v1_session_path, headers: headers(@user)
    assert_nil assigns(:current_user)
  end
end
