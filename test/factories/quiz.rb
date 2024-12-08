# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    name { Faker::Lorem.sentence(word_count: 3) }
    status { %w[published draft].sample }
    questions_count { 0 }
    association :creator, factory: :user
    association :category, factory: :category
  end
end
