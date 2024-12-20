# frozen_string_literal: true

class AddSortOrderColumnToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :sort_order, :integer, default: 0
  end
end
