json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :time_limit

  json.questions @questions do |question|
    json.extract! question,
      :id,
      :question
    json.options question.options["options"].shuffle
  end
end
