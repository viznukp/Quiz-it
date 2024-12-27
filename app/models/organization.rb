# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 255

  has_many :users, dependent: :destroy
  has_many :quizzes, through: :users

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :slug, presence: true, uniqueness: true

  before_validation :set_slug, on: [:create, :update]

  private

    def set_slug
      self.slug = name.parameterize if name.present?
    end
end
