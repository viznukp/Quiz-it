# frozen_string_literal: true

class AddRandomizationSeedToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :seed, :integer, default: 0
  end
end
