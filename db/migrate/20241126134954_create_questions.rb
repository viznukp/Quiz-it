# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions, id: :uuid do |t|
      t.string :question, null: false
      t.string :options, array: true, default: []
      t.integer :answer_index, null: false
      t.uuid :quiz_id, null: false, foreign_key: true

      t.timestamps
    end

    add_foreign_key :questions, :quizzes, column: :quiz_id
  end
end
