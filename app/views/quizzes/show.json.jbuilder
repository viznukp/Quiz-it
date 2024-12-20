json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :category,
    :status,
    :accessibility,
    :questions
  json.last_updated_at date_and_time_from_timestamp(@quiz.updated_at)
end
