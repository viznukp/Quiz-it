json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :slug,
    :category,
    :status

  json.questions @quiz.questions.map { |question|
    question.attributes.except("answer_index")
  }
end
