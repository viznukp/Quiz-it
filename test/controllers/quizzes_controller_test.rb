# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, user_type: "admin")
    @category = create(:category)
    @quiz = build(:quiz, creator: @user, category: @category)
    @headers = headers(@user)
  end

  def test_index_action_should_list_all_quizzes
    quiz_count = 5
    create_list(:quiz, quiz_count, creator: @user, status: "draft")

    get quizzes_path, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    response_quiz_ids = response_json["quizzes"].pluck("id")
    expected_quiz_count = response_count_considering_pagination(quiz_count)

    assert_equal Quiz.order(:id).limit(default_page_size).pluck(:id), response_quiz_ids.sort
    assert_equal response_quiz_ids.length, expected_quiz_count
  end

  def test_should_create_valid_quiz
    assert_difference "Quiz.count", 1 do
      post quizzes_path, params: { quiz: { name: "Example quiz", category_id: @category.id } }, headers: @headers
      assert_response :success
    end
  end

  def test_should_delete_quiz
    @quiz.save!
    assert_difference "Quiz.count", -1 do
      delete quiz_path(slug: @quiz.slug), headers: @headers
      assert_response :success
    end
  end

  def test_should_show_quiz
    @quiz.save!
    get quiz_path(slug: @quiz.slug), headers: @headers
    assert_response :success
    response_quiz = response.parsed_body["quiz"]
    response_quiz_slug = response_quiz["slug"]
    assert_equal @quiz.slug, response_quiz_slug
  end

  def test_should_update_with_valid_params
    @quiz.save!
    new_quiz_name = @quiz.name + "updated"
    put quiz_path(@quiz.slug), params: { quiz: { name: new_quiz_name } }, headers: @headers
    assert_response :success
    assert_equal new_quiz_name, @quiz.reload.name
  end

  def test_should_bulk_update_quiz
    quizzes = create_list(:quiz, 3, creator: @user, status: "draft")
    update_params = {
      quizzes: {
        slugs: quizzes.map(&:slug),
        update_fields: { status: "published" }
      }
    }

    put bulk_update_quizzes_path, params: update_params, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", entity: "Quizzes"), response_json["notice"]

    quizzes.each do |quiz|
      assert_equal "published", quiz.reload.status
    end
  end

  def test_should_bulk_destroy_quizzes
    quiz_count = 3
    quizzes = create_list(:quiz, quiz_count, creator: @user)

    assert_difference "Quiz.count", -quiz_count do
      delete bulk_destroy_quizzes_path, params: { quizzes: { slugs: quizzes.map(&:slug) } }, headers: @headers
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", entity: "Quizzes"), response_json["notice"]
  end

  def test_filter_quizzes_by_category
    quiz_count_per_category = 3
    category_one = create(:category)
    category_two = create(:category)
    create_list(:quiz, quiz_count_per_category, category: category_one, creator: @user)
    create_list(:quiz, quiz_count_per_category, category: category_two, creator: @user)

    get quizzes_path(filters: { category: category_one.name }), headers: @headers
    assert_response :success
    response_quiz_ids = response.parsed_body["quizzes"].pluck("id")

    expected_response_quizzes_count = response_count_considering_pagination(quiz_count_per_category)

    assert_equal Quiz.where(category: category_one)
      .order(:id).limit(expected_response_quizzes_count)
      .pluck(:id),
      response_quiz_ids.sort
  end

  def test_filter_quizzes_by_name
    create(:quiz, name: "First quiz", creator: @user)
    quiz_to_search = create(:quiz, name: "Second quiz", creator: @user)
    create(:quiz, name: "Third quiz", creator: @user)

    quiz_to_search = Quiz.first
    get quizzes_path(filters: { quiz_name: quiz_to_search.name }), headers: @headers
    assert_response :success
    response_quiz_ids = response.parsed_body["quizzes"].pluck("id")
    assert_equal quiz_to_search.id, response_quiz_ids[0]
  end

  def test_should_not_bulk_update_with_invalid_slugs
    quizzes = create_list(:quiz, 3, creator: @user, status: "draft")

    update_params = {
      quizzes: {
        slugs: quizzes.map { |quiz| quiz.slug + "invalid" },
        update_fields: { status: "published" }
      }
    }

    put bulk_update_quizzes_path, params: update_params, headers: @headers
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Quizzes"), response_json["error"]
  end
end
