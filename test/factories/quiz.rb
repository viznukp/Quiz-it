# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    name { Faker::Lorem.sentence(word_count: 3) }
    status { "draft" }
    questions_count { 0 }
    accessibility { "discoverable" }
    association :creator, factory: :user
    association :category, factory: :category
  end
end
