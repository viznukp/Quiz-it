# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :creator, foreign_key: "creator_id", class_name: "User"
  has_many :questions, dependent: :delete_all

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
  validates :category, presence: true
  validates :status,
    presence: true,
    inclusion: { in: statuses.keys }
  validates :creator_id, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  def set_slug
    name_slug = name.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "^#{name_slug}$|^#{name_slug}-[0-9]+$"
    ).order("LENGTH(slug) DESC", slug: :desc).first&.slug

    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end

    slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug

    self.slug = slug_candidate
  end

  private

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("quiz.slug.immutable"))
      end
    end
end
