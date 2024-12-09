# frozen_string_literal: true

require "test_helper"

class SlugGeneratorServiceTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    category = create(:category)
    @quiz = build(:quiz, creator: user, category:)
  end

  def generate_slug(entity, field, target_field)
    SlugGeneratorService.new(entity, field, target_field).generate_slug
  end

  def test_slug_is_parameterized_field
    name = @quiz.name
    slug = generate_slug(@quiz, :name, :slug)

    assert_equal name.parameterize, slug
  end

  def test_incremental_slug_generation_for_quizzes_with_duplicate_two_worded_names
    first_quiz = create(:quiz, name: "test quiz")
    second_quiz = create(:quiz, name: "test quiz")

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_incremental_slug_generation_for_duplicate_hyphenated_names
    first_quiz = create(:quiz, name: "test quiz")
    second_quiz = create(:quiz, name: "test quiz")

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_slug_generation_for_names_one_being_prefix_of_the_other
    first_quiz = create(:quiz, name: "fishing")
    second_quiz = create(:quiz, name: "fish")

    assert_equal "fishing", first_quiz.slug
    assert_equal "fish", second_quiz.slug
  end

  def test_error_raised_for_duplicate_slug
    @quiz.save!

    another_quiz = create(:quiz, name: "another test quiz")

    assert_raises ActiveRecord::RecordInvalid do
      @quiz.update!(slug: another_quiz.slug)
    end

    error_msg = @quiz.errors_to_sentence
    assert_match I18n.t("quiz.slug.immutable"), error_msg
  end
end
