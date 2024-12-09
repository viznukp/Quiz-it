# frozen_string_literal: true

class AddSubmissionsCountToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :submissions_count, :integer, default: 0
  end
end
