json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :time_limit

  json.questions @questions.shuffle(random: Random.new(@seed)) do |question|
    json.extract! question,
      :id,
      :question
    json.options question.options["options"].shuffle(random: Random.new(@seed))
  end
  json.randomization_seed @seed
end
