# frozen_string_literal: true

class AddUniqueIndexForOrganizationSlug < ActiveRecord::Migration[7.0]
  def change
    add_index :organizations, :slug, unique: true
  end
end
