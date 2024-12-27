# frozen_string_literal: true

class Submission < ApplicationRecord
  enum status: { completed: "completed", incomplete: "incomplete" }

  belongs_to :user
  belongs_to :quiz, counter_cache: true

  validates :user_id, presence: true
  validates :quiz_id, presence: true
  validates :total_questions, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :correct_answers_count, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :wrong_answers_count, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :unanswered_count, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :status, inclusion: { in: statuses.keys }
  validates :quiz_id, uniqueness: { scope: :user_id }
end
