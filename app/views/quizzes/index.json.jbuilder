json.array! @quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :category,
    :status,
    :updated_at
end
