# frozen_string_literal: true

class AddOrganizationIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :organization_id, :uuid, null: false
    add_foreign_key :users, :organizations, column: :organization_id
  end
end
