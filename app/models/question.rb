# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz, counter_cache: true
  validates :question, :answer_id, :options, presence: true
end
