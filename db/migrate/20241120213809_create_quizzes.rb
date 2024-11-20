# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes, id: :uuid do |t|
      t.string :name, null: false
      t.string :status, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
