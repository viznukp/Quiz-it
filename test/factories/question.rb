# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    question { Faker::Lorem.sentence(word_count: 3) }
    options { Array.new(4) { Faker::Lorem.word } }
    answer_index { rand(1..4) }
    quiz
  end
end
