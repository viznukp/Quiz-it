# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  validates :question, :answer_index, :options, presence: true
  validate :validate_options_array
  validate :validate_answer_index

  private

    def validate_options_array
      if options.blank? || !options.is_a?(Array) || options.size < 2
        errors.add(:options, I18n.t("options.must_be_array"))
      end
      if options.any?(&:blank?)
        errors.add(:options, I18n.t("options.cannot_contain_empty_values"))
      end
    end

    def validate_answer_index
      if answer_index > options.size
        errors.add(:answer_index, I18n.t("answer_index.cannot_be_greater_than_number_of_options"))
      end
    end
end
