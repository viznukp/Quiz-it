# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_OPTIONS_COUNT = 6
  MIN_OPTIONS_COUNT = 2
  belongs_to :quiz, counter_cache: true

  validates :question, :answer_index, :options, presence: true
  validate :validate_options_array
  validate :validate_answer_index

  after_save :touch_quiz
  after_destroy :touch_quiz

  private

    def validate_options_array
      if options.size < MIN_OPTIONS_COUNT
        errors.add(
          :question,
          I18n.t("options.min_options", count: MIN_OPTIONS_COUNT))
      end
      if options.size > MAX_OPTIONS_COUNT
        errors.add(
          :question,
          I18n.t("options.max_options", count: MAX_OPTIONS_COUNT))
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

    def touch_quiz
      quiz.touch
    end
end
