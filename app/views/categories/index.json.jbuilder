# frozen_string_literal: true

json.categories do
  json.array! @categories do |category|
    json.extract! category,
      :id,
      :name
    json.quiz_count category.quizzes.count

  end
end
