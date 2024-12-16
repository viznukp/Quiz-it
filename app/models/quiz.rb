# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", published: "published" }, default: :draft

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
  validates :creator_id, presence: true
  validates :category_id, presence: true
  validates :slug, presence: true, uniqueness: true
  validate :slug_not_changed

  before_validation :set_slug, on: :create

  private

    def set_slug
      self.slug = SlugGeneratorService.new(self, :name, :slug).generate_slug
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("quiz.slug.immutable"))
      end
    end
end
