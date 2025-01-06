  # frozen_string_literal: true

json.organization @organization&.name

json.quizzes do
  json.array! @paginated_quizzes do |quiz|
    json.extract! quiz,
      :id,
      :name,
      :status,
      :slug,
      :questions_count
    json.category quiz&.category&.name
  end
end

json.pagination_data @pagination_metadata
