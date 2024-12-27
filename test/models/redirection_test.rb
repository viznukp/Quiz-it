# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = build(:redirection)
  end

  def test_redirection_should_not_be_saved_without_source
    @redirection.source = ""
    assert @redirection.invalid?

    assert_includes @redirection.errors.full_messages, "Source can't be blank"
  end

  def test_redirection_should_not_be_saved_without_destination
    @redirection.destination = ""
    assert @redirection.invalid?

    assert_includes @redirection.errors.full_messages, "Destination can't be blank"
  end

  def test_source_must_be_unique
    @redirection.save!
    redirection_with_duplicate_source = build(:redirection, source: @redirection.source)

    assert redirection_with_duplicate_source.invalid?
    assert_includes redirection_with_duplicate_source.errors.full_messages, "Source has already been taken"
  end

  def test_should_not_create_cyclic_redirection
    @redirection.save!
    new_redirection_1 = create(:redirection, source: @redirection.destination)
    new_redirection_2 = build(:redirection, source: new_redirection_1.destination, destination: @redirection.source)

    assert new_redirection_2.invalid?
    assert_includes new_redirection_2.errors.full_messages, "Destination creates a cyclic redirection"
  end

  def test_should_not_have_same_source_and_destination
    url = "http://localhost:3000/test"
    redirection = build(:redirection, source: url, destination: url)

    assert redirection.invalid?
    assert_includes redirection.errors.full_messages, "Destination cannot be the same as the source"
  end
end
