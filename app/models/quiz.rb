# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", published: "published" }, default: :draft
  enum :accessibility, { discoverable: "discoverable", hidden: "hidden" }, default: :public

  belongs_to :creator, foreign_key: "creator_id", class_name: "User"
  belongs_to :category
  has_many :questions, dependent: :delete_all
  has_many :submissions, dependent: :delete_all

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
  validates :status,
    presence: true,
    inclusion: { in: statuses.keys }
  validates :accessibility, inclusion: { in: %w[discoverable hidden] }
  validates :email_notification, inclusion: { in: [true, false] }
  validates :creator_id, presence: true
  validates :category_id, presence: true
  validates :slug, presence: true, uniqueness: true
  validate :slug_not_changed
  validate :ensure_questions_present, if: :published?

  before_validation :set_slug, on: :create

  private

    def set_slug
      self.slug = SlugGeneratorService.new(self, :name, :slug).process!
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("quiz.slug.immutable"))
      end
    end

    def ensure_questions_present
      errors.add(:base, I18n.t("cannot_be_published_without_questions")) if questions.empty?
    end
end
