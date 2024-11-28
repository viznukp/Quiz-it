# frozen_string_literal: true

class MakeOrganizationSlugNotNullable < ActiveRecord::Migration[7.0]
  def up
    change_column_null :organizations, :slug, false
  end

  def down
    change_column_null :organizations, :slug, true
  end
end
