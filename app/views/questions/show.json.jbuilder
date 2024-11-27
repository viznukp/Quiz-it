json.question do
  json.extract! @question,
    :id,
    :question,
    :options,
    :answer_index
end
