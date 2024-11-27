# frozen_string_literal: true

class AddSlugToQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :slug, :string, index: { unique: true }
  end
end
