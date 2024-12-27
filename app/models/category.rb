# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 125
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  acts_as_list column: :sort_order

  has_many :quizzes

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
end
