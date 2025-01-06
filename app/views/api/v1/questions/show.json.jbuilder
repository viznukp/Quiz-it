# frozen_string_literal: true

json.quiz do
  json.extract! @current_quiz,
    :name,
    :slug

  json.question do
    json.extract! @question,
      :question,
      :answer_id
    json.options @question.options["options"]
  end
end
