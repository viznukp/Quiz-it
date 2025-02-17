# frozen_string_literal: true

require "test_helper"

class Api::V1::QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, user_type: "admin")
    @category = create(:category)
    @quiz = build(:quiz, creator: @user, category: @category)
    @headers = headers(@user)
  end

  def test_index_action_should_list_all_quizzes
    quiz_count = 5
    create_list(:quiz, quiz_count, creator: @user, status: "draft", category: @category)

    get api_v1_quizzes_path, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_quiz_ids = response_json["quizzes"].pluck("id")
    expected_quiz_count = response_count_considering_pagination(quiz_count)

    assert_equal Quiz.order(:id).limit(default_page_size).pluck(:id), response_quiz_ids.sort
    assert_equal response_quiz_ids.length, expected_quiz_count
  end

  def test_should_create_valid_quiz
    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_path, params: { quiz: { name: "Example quiz", category_id: @category.id } }, headers: @headers
      assert_response :success
    end
  end

  def test_should_delete_quiz
    @quiz.save!
    assert_difference "Quiz.count", -1 do
      delete api_v1_quiz_path(slug: @quiz.slug), headers: @headers
      assert_response :success
    end
  end

  def test_should_show_quiz
    @quiz.save!
    get api_v1_quiz_path(slug: @quiz.slug), headers: @headers
    assert_response :success
    response_quiz = response.parsed_body["quiz"]
    response_quiz_slug = response_quiz["slug"]
    assert_equal @quiz.slug, response_quiz_slug
  end

  def test_should_update_with_valid_params
    @quiz.save!
    new_quiz_name = @quiz.name + "updated"
    put api_v1_quiz_path(@quiz.slug), params: { quiz: { name: new_quiz_name } }, headers: @headers
    assert_response :success
    assert_equal new_quiz_name, @quiz.reload.name
  end

  def test_should_bulk_update_quiz
    quizzes = create_list(:quiz, 3, creator: @user, status: "draft", category: @category)
    update_params = {
      quizzes: {
        slugs: quizzes.map(&:slug),
        update_fields: { status: "published" }
      }
    }

    put bulk_update_api_v1_quizzes_path, params: update_params, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", entity: "Quizzes"), response_json["notice"]

    quizzes.each do |quiz|
      assert_equal "published", quiz.reload.status
    end
  end

  def test_should_bulk_destroy_quizzes
    quiz_count = 3
    quizzes = create_list(:quiz, quiz_count, creator: @user, category: @category)

    assert_difference "Quiz.count", -quiz_count do
      delete bulk_destroy_api_v1_quizzes_path, params: { quizzes: { slugs: quizzes.map(&:slug) } }, headers: @headers
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", entity: "Quizzes"), response_json["notice"]
  end

  def test_should_not_bulk_update_with_invalid_slugs
    quizzes = create_list(:quiz, 3, creator: @user, status: "draft", category: @category)

    update_params = {
      quizzes: {
        slugs: quizzes.map { |quiz| quiz.slug + "invalid" },
        update_fields: { status: "published" }
      }
    }

    put bulk_update_api_v1_quizzes_path, params: update_params, headers: @headers
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Quizzes"), response_json["error"]
  end
end
