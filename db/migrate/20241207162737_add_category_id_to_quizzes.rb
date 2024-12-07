# frozen_string_literal: true

class AddCategoryIdToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :category_id, :uuid
    add_foreign_key :quizzes, :categories, column: :category_id
    add_index :quizzes, :category_id
  end
end
