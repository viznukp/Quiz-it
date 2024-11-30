# frozen_string_literal: true

class CreateSubmissions < ActiveRecord::Migration[7.0]
  def change
    create_table :submissions, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :quiz, null: false, foreign_key: true, type: :uuid
      t.integer :total_questions, null: false, default: 0
      t.integer :correct_answers_count, null: false, default: 0
      t.integer :wrong_answers_count, null: false, default: 0
      t.integer :unanswered_count, null: false, default: 0
      t.jsonb :answers, null: false, default: {}
      t.string :status

      t.timestamps
    end
  end
end
