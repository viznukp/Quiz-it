# frozen_string_literal: true

class DropUsersTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :users
  end
end
