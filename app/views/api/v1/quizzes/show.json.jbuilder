# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :category,
    :status,
    :accessibility,
    :time_limit,
    :email_notification,
    :randomize_questions,
    :randomize_options

  json.questions @quiz.questions.map do |question|
    json.extract! question,
      :id,
      :question,
      :answer_id
    json.options question.options["entries"]
  end
  json.last_updated_at @quiz.updated_at
end
