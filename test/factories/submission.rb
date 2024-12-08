# frozen_string_literal: true

FactoryBot.define do
  factory :submission do
    user
    quiz
    total_questions { 0 }
    correct_answers_count { 0 }
    wrong_answers_count { 0 }
    unanswered_count { 0 }
    status { "completed" }
    answers do
      Array.new(5) do
        question = create(:question, quiz:)
        { "question_id" => question.id, "selected_choice" => rand(1..4) }
      end
    end
  end
end
