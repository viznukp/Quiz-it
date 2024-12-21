# frozen_string_literal: true

class AddTimeToQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :time_limit, :integer, default: 0
  end
end
