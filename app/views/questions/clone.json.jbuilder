  # frozen_string_literal: true

json.question do
  json.extract! @cloned_question,
    :question,
    :options,
    :answer_index
end
json.quiz @cloned_question.quiz.name
