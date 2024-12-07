# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_name_should_not_be_empty
    @organization.name = ""
    assert @organization.invalid?

    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_be_of_valid_length
    @organization.name = "a" * (Organization::MAX_NAME_LENGTH + 1)
    assert @organization.invalid?
  end

  def test_organization_should_not_be_saved_without_slug
    @organization.save!

    new_organization_with_existing_name = build(:organization)
    new_organization_with_existing_name.name = @organization.name
    assert new_organization_with_existing_name.save!, "Slug is already taken"
  end
end
