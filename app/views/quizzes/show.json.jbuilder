json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :category,
    :status,
    :questions
end
