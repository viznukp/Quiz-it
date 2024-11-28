# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 255

  has_many :users, dependent: :destroy
  has_many :quizzes, through: :users

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }

  before_create :set_slug

  private

    def set_slug
      slug_service = SlugGeneratorService.new(self, :name, :slug)
      self.slug = slug_service.generate_slug
    end
end
