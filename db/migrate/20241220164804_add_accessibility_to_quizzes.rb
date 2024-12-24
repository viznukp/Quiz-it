# frozen_string_literal: true

class AddAccessibilityToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :accessibility, :string, default: "discoverable"
  end
end
