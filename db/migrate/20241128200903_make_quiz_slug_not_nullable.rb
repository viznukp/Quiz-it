# frozen_string_literal: true

class MakeQuizSlugNotNullable < ActiveRecord::Migration[7.0]
  def up
    change_column_null :quizzes, :slug, false
  end

  def down
    change_column_null :quizzes, :slug, true
  end
end
