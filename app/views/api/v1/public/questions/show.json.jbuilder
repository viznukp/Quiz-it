json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :time_limit

  randomized_questions = @quiz.randomize_questions ? @questions.shuffle(random: Random.new(@seed)) : @questions
  json.questions randomized_questions do |question|
    json.extract! question,
      :id,
      :question

    randomized_options = @quiz.randomize_options ? question.options["entries"].shuffle(random: Random.new(@seed)) : question.options["entries"]
    json.options randomized_options
  end

  json.randomization_seed @seed
end
