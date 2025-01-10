# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :source, presence: true, uniqueness: true
  validates :destination, presence: true
  validates_with RedirectionValidator
end
