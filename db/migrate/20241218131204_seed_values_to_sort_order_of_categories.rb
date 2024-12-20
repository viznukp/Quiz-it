# frozen_string_literal: true

class SeedValuesToSortOrderOfCategories < ActiveRecord::Migration[7.0]
  def up
    Category.order(:created_at).find_each.with_index(1) do |category, index|
      category.update_column(:sort_order, index)
    end
  end

  def down
    Category.find_each do |category|
      category.update_column(:sort_order, 0)
    end
  end
end
