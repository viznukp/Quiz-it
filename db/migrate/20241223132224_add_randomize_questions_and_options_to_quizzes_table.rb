# frozen_string_literal: true

class AddRandomizeQuestionsAndOptionsToQuizzesTable < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :randomize_questions, :boolean, default: false
    add_column :quizzes, :randomize_options, :boolean, default: false
  end
end
