# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
    render
  end

  def create
    quiz = Quiz.new(quiz_params)
    quiz.save!
    render_notice(t("successfully_created", entity: "Quiz"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category)
    end
end
