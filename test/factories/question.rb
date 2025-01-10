# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    question { Faker::Lorem.sentence(word_count: 3) }
    options { { entries: Array.new(4) { |index| { id: index + 1, option: Faker::Lorem.word } } } }
    answer_id { rand(1..4) }
    quiz
  end
end
