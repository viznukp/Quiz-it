# frozen_string_literal: true

class AddEmailNotificationToQuizzesTable < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :email_notification, :boolean, default: false
  end
end
