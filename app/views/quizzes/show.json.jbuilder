json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :category,
    :status,
    :questions
end
