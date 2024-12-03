# frozen_string_literal: true

class EvaluationService
  def evaluate_submission(submission)
    quiz = submission.quiz
    questions = quiz.questions
    total_questions = questions.count
    correct_answers_count = 0
    wrong_answers_count = 0

    answer_key = {}
    questions.each do |question|
      answer_key[question.id] = {
        answer_index: question.answer_index,
        option_count: question.options.count
      }
    end

    submission.answers.each do |answer|
      question_id = answer["question_id"]
      selected_choice = answer["selected_choice"]
      correct_answer = answer_key[question_id][:answer_index]

      if selected_choice == correct_answer
        correct_answers_count += 1
      elsif (1...answer_key[question_id][:options_count]).include?(selected_choice)
        wrong_answers_count += 1
      end
    end

    submission.total_questions = total_questions
    submission.correct_answers_count = correct_answers_count
    submission.wrong_answers_count = wrong_answers_count
    submission.unanswered_count = total_questions - correct_answers_count + wrong_answers_count
    submission
  end
end
