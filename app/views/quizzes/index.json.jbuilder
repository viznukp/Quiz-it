json.result_type @result_type
json.quizzes @paginated_quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :category,
    :status,
    :slug,
    :questions_count,
    :updated_at
end
json.pagination_data @pagination_metadata
