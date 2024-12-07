# frozen_string_literal: true

class RemoveCategoryFromQuizzes < ActiveRecord::Migration[7.0]
  def change
    remove_column :quizzes, :category
  end
end
