# frozen_string_literal: true

class ResultService
  def generate_result(submission)
    quiz = submission.quiz
    questions = quiz.questions

    correct_answers_count = 0
    wrong_answers_count = 0
    unanswered_count = 0

    result = {
      quiz_name: quiz.name,
      total_questions: questions.count,
      correct_answers_count: 0,
      wrong_answers_count: 0,
      unanswered_count: 0,
      questions: []
    }

    questions.each do |question|
      options = question.options
      user_selected_choice = submission.answers.find { |answer|
        answer["question_id"] == question.id.to_s }&.dig("selected_choice")

      if user_selected_choice.nil? || user_selected_choice.zero?
        unanswered_count += 1
      elsif user_selected_choice == question.answer_index
        correct_answers_count += 1
      else
        wrong_answers_count += 1
      end

      result[:questions] << {
        id: question.id,
        question: question.question,
        options:,
        correct_answer_index: question.answer_index,
        user_selection_index: user_selected_choice
      }
    end

    result[:correct_answers_count] = correct_answers_count
    result[:wrong_answers_count] = wrong_answers_count
    result[:unanswered_count] = unanswered_count

    result
  end
end
