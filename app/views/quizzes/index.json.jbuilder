json.result_type @result_type
json.quizzes @paginated_quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :status,
    :slug,
    :questions_count,
    :updated_at
  json.category quiz.category.name
end
json.pagination_data @pagination_metadata
