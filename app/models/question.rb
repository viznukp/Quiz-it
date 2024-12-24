# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz, counter_cache: true

  validates :question, :answer_id, :options, presence: true

  after_save :touch_quiz
  after_destroy :touch_quiz

  private

    def touch_quiz
      quiz.touch
    end
end
