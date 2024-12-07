# frozen_string_literal: true

json.quiz_data do
  json.organization @organization.name

  json.quizzes do
    json.array! @quizzes do |quiz|
      json.extract! quiz,
        :id,
        :name,
        :status,
        :slug,
        :questions_count,
        :updated_at
      json.category quiz.category.name
    end
  end
end
