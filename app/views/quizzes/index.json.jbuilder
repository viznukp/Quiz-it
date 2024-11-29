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
