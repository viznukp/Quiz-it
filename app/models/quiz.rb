# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :creator, foreign_key: "creator_id", class_name: "User"

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
  validates :category, presence: true
  validates :status,
    presence: true,
    inclusion: { in: statuses.keys }
  validates :creator_id, presence: true
end
