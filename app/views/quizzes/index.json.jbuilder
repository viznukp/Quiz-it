# frozen_string_literal: true

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
  json.created_on quiz.updated_at
end

json.extract! @quizzes_metadata,
  :result_type,
  :total_quizzes,
  :published_quizzes,
  :draft_quizzes

json.pagination_data @pagination_metadata
