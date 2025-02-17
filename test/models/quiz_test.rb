# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category)
    @quiz = build(:quiz, creator: @user, category: @category)
  end

  def test_name_should_not_be_empty
    @quiz.name = ""
    assert @quiz.invalid?

    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_be_of_valid_length
    @quiz.name = "a" * (Quiz::MAX_NAME_LENGTH + 1)
    assert @quiz.invalid?
  end

  def test_validation_should_accept_valid_names
    valid_names = %w[name name_1 name! -name- _name_ /name 1]

    valid_names.each do |name|
      @quiz.name = name
      assert(@quiz.valid?, "Name '#{name}' should be valid")
    end
  end

  def test_validation_should_reject_invalid_names
    invalid_names = ["", "   ", "#$%#%^$%", "\n", "/", "***", "__", "~", "..."]

    invalid_names.each do |name|
      @quiz.name = name
      assert(@quiz.invalid?, "Name '#{name}' should be invalid")
    end
  end

  def test_quiz_should_be_invalid_without_creator
    @quiz.creator = nil
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Creator must exist"
  end

  def test_slug_should_be_unique
    @quiz.save!

    new_quiz_with_existing_name = build_quiz
    new_quiz_with_existing_name.name = @quiz.name
    assert new_quiz_with_existing_name.save!, "Slug is already taken"
  end

  def test_slug_should_not_be_changed_after_creation
    @quiz.name = "Sample quiz"
    @quiz.save!
    @quiz.slug = "new-slug"
    assert @quiz.invalid?

    assert_includes @quiz.errors_to_sentence, I18n.t("quiz.slug.immutable")
  end

  def test_quiz_should_not_be_saved_without_status
    @quiz.status = nil
    assert @quiz.invalid?

    assert_includes @quiz.errors.full_messages, "Status can't be blank"
  end

  def test_quiz_count_increases_on_saving
    assert_difference ["Quiz.count"] do
      create(:quiz)
    end
  end

  def test_quiz_count_decreases_on_deleting
    quiz = create(:quiz)
    assert_difference ["Quiz.count"], -1 do
      quiz.destroy!
    end
  end

  def test_quiz_slug_is_parameterized_name
    name = @quiz.name
    @quiz.save!
    assert_equal name.parameterize, @quiz.slug
  end

  def test_creates_multiple_quizzes_with_unique_slug
    quizzes = create_list(:quiz, 10, category: @category)
    slugs = quizzes.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_quizzes_created_by_user_are_deleted_when_creator_is_deleted
    creator = create(:user)
    create(:quiz, category: @category, creator:)

    assert_difference "Quiz.count", -1 do
      creator.destroy
    end
  end

  def test_cannot_be_published_without_questions
    quiz = build_quiz
    quiz.status = "published"

    assert quiz.invalid?
    assert_includes quiz.errors.full_messages, I18n.t("cannot_be_published_without_questions")
  end

  def test_incremental_slug_generation_for_quizzes_with_duplicate_two_worded_names
    first_quiz = create(:quiz, category: @category, name: "test quiz")
    second_quiz = create(:quiz, category: @category, name: "test quiz")

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_incremental_slug_generation_for_duplicate_hyphenated_names
    first_quiz = create(:quiz, category: @category, name: "test quiz")
    second_quiz = create(:quiz, category: @category, name: "test quiz")

    assert_equal "test-quiz", first_quiz.slug
    assert_equal "test-quiz-2", second_quiz.slug
  end

  def test_slug_generation_for_names_one_being_prefix_of_the_other
    first_quiz = create(:quiz, category: @category, name: "fishing")
    second_quiz = create(:quiz, category: @category, name: "fish")

    assert_equal "fishing", first_quiz.slug
    assert_equal "fish", second_quiz.slug
  end

  def test_error_raised_for_duplicate_slug
    @quiz.save!

    second_quiz = create(:quiz, category: @category, name: "another test quiz")

    assert_raises ActiveRecord::RecordInvalid do
      @quiz.update!(slug: second_quiz.slug)
    end

    error_message = @quiz.errors_to_sentence
    assert_match I18n.t("quiz.slug.immutable"), error_message
  end

  private

    def build_quiz
      user = create(:user)
      build(:quiz, creator: user, category: @category)
    end
end
