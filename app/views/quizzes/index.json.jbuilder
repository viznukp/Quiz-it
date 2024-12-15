json.result_type @result_type
json.quizzes @paginated_quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :status,
    :slug,
    :questions_count,
    :submissions_count,
    :updated_at
  json.category quiz.category.name
  json.created_on date_from_timestamp(quiz.updated_at)
end
json.pagination_data @pagination_metadata
