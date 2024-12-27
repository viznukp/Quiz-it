# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :source, presence: true, uniqueness: true
  validates :destination, presence: true
  validate :no_cyclic_redirections
  validate :source_and_destination_cannot_be_same

  private

    def source_and_destination_cannot_be_same
      errors.add(:destination, I18n.t("destination_cannot_be_same_as_source")) if source == destination
    end

    def no_cyclic_redirections
      if cycle_detected?(source, destination)
        errors.add(:destination, I18n.t("cyclic_redirection"))
      end
    end

    def cycle_detected?(source, destination)
      current_redirection = Redirection.find_by(source: destination)
      while current_redirection
        return true if current_redirection.destination == source

        current_redirection = Redirection.find_by(source: current_redirection.destination)
      end

      false
    end
end
