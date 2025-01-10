# frozen_string_literal: true

module Sluggable
  extend ActiveSupport::Concern

  included do
    before_validation :set_slug, on: :create
  end

  private

    def set_slug
      name_slug = name.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_slug = Quiz.where(
        regex_pattern,
        "^#{name_slug}$|^#{name_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_slug.present?
        slug_count = latest_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
      self.slug = slug_candidate
    end
end
