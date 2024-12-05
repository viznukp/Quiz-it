# frozen_string_literal: true

json.quiz_data do
  json.organization @quizzes.first&.organization&.name || ""

  json.quizzes do
    json.array! @quizzes do |quiz|
      json.extract! quiz,
        :id,
        :name,
        :category,
        :status,
        :slug,
        :questions_count,
        :updated_at
    end
  end
end
