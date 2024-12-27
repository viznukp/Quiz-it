# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    category = create(:category)
    @quiz = build(:quiz, creator: @user, category:)
  end

  def build_quiz
    user = create(:user)
    category = create(:category)
    build(:quiz, creator: user, category:)
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
    assert_includes @quiz.errors.full_messages, "Slug is immutable"
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
    quizzes = create_list(:quiz, 10)
    slugs = quizzes.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_quizzes_created_by_user_are_deleted_when_creator_is_deleted
    creator = create(:user)
    create(:quiz, creator:)

    assert_difference "Quiz.count", -1 do
      creator.destroy
    end
  end

  def test_cannot_be_published_without_questions
    quiz = build_quiz
    quiz.status = "published"

    assert quiz.invalid?
    assert_includes quiz.errors.full_messages, "Quiz cannot be published without any questions"
  end
end
