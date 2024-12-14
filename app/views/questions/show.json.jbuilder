# frozen_string_literal: true

json.quiz do
  json.extract! @current_quiz,
    :name,
    :slug,
    :category,
    :status

  json.question do
    json.extract! @question,
      :question,
      :options,
      :answer_index
  end
end
