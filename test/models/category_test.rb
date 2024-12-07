# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_have_name
    @category.name = ""
    assert @category.invalid?

    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert @category.invalid?
  end

  def test_validation_should_accept_valid_names
    valid_names = ["ABCD", "abcd", "abcd123", "a", "1234", "123abc", "abc!#@$", "!@#Abc", "123!@$",
                    "abcd  123 !@$@#.."]

    valid_names.each do |name|
      @category.name = name
      assert(@category.valid?, "Name '#{name}' should be valid")
    end
  end

  def test_validation_should_reject_invalid_names
    invalid_names = ["", "   ", "#$%#%^$%", "\n"]

    invalid_names.each do |name|
      @category.name = name
      assert(@category.invalid?, "Name '#{name}' should be invalid")
    end
  end
end
