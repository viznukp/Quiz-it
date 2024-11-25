# frozen_string_literal: true

class AddCreatorIdToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :creator_id, :uuid, null: false
  end
end
