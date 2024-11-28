# frozen_string_literal: true

class AddSlugToOrganization < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :slug, :string
  end
end
