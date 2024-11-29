# frozen_string_literal: true

class AddQuestionsCountToQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :questions_count, :integer, default: 0
  end
end
