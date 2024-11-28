# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :creator, foreign_key: "creator_id", class_name: "User"
  has_one :organization, through: :creator
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
    slug_service = SlugGeneratorService.new(self, :name, :slug)
    self.slug = slug_service.generate_slug
  end

  private

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("quiz.slug.immutable"))
      end
    end
end
