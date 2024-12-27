# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    source { "http://localhost:3000/#{Faker::Internet.slug}" }
    destination { "http://localhost:3000/#{Faker::Internet.slug}" }
  end
end
