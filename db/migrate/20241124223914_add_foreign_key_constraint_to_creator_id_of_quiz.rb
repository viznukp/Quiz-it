# frozen_string_literal: true

class AddForeignKeyConstraintToCreatorIdOfQuiz < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :quizzes, :users, column: :creator_id, on_delete: :cascade
  end
end
