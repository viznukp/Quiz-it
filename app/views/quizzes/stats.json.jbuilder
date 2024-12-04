# frozen_string_literal: true

json.stats do
  json.extract! @stats,
    :total_quizzes,
    :published_quizzes,
    :draft_quizzes
end
