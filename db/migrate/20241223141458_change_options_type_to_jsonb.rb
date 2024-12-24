# frozen_string_literal: true

class ChangeOptionsTypeToJsonb < ActiveRecord::Migration[7.0]
  def up
    add_column :questions, :options_jsonb, :jsonb, default: {}, null: false

    Question.reset_column_information
    Question.find_each do |question|
      transformed_options = question.options.map.with_index(1) do |option, index|
        { id: index, option: }
      end
      question.update_column(:options_jsonb, { options: transformed_options })
    end

    remove_column :questions, :options
    rename_column :questions, :options_jsonb, :options
  end

  def down
    add_column :questions, :options_array, :string, array: true, default: [], null: false

    Question.reset_column_information
    Question.find_each do |question|
      transformed_options = question.options["options"].map { |option| option["option"] }
      question.update_column(:options_array, transformed_options)
    end

    remove_column :questions, :options
    rename_column :questions, :options_array, :options
  end
end
