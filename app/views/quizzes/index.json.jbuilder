json.array! @quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :category,
    :status,
    :slug,
    :updated_at
  json.question_count quiz.questions.size
end
