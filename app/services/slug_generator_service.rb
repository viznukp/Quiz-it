# frozen_string_literal: true

class SlugGeneratorService
  attr_reader :entity, :column_to_slugify, :destination_column

  def initialize(entity, column_to_slugify, destination_column)
    @entity = entity
    @column_to_slugify = column_to_slugify
    @destination_column = destination_column
  end

  def generate_slug
    column_value = entity.send(column_to_slugify)
    column_slug = column_value.parameterize

    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_slug = entity.class.where(
      regex_pattern,
      "^#{column_slug}$|^#{column_slug}-[0-9]+$"
    ).order("LENGTH(#{destination_column}) DESC", destination_column => :desc).first&.send(destination_column)

    slug_count = 0
    if latest_slug.present?
      slug_count = latest_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end

    slug_candidate = slug_count.positive? ? "#{column_slug}-#{slug_count + 1}" : column_slug

    slug_candidate
  end
end
