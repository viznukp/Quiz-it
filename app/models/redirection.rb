# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :source, presence: true
  validates :destination, presence: true
end
