# frozen_string_literal: true

class EvaluationService
  def evaluate_submission(submission)
    quiz = submission.quiz
    questions = quiz.questions
    correct_answers_count = 0
    wrong_answers_count = 0
    unanswered_count = 0

    answer_key = {}
    questions.each do |question|
      answer_key[question.id.to_s] = question.answer_index
    end

    submission.answers.each do |answer|
      question_id = answer["question_id"]
      selected_choice = answer["selected_choice"]
      correct_answer = answer_key[question_id]

      if selected_choice == 0 || selected_choice.nil?
        unanswered_count += 1
      elsif selected_choice == correct_answer
        correct_answers_count += 1
      else
        wrong_answers_count += 1
      end
    end

    submission.total_questions = questions.count
    submission.correct_answers_count = correct_answers_count
    submission.wrong_answers_count = wrong_answers_count
    submission.unanswered_count = unanswered_count
    submission
  end
end
