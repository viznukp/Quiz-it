# frozen_string_literal: true

class RenameAnswerIndexCoumnOfQuestions < ActiveRecord::Migration[7.0]
  def change
    rename_column :questions, :answer_index, :answer_id
  end
end
