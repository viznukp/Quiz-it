# frozen_string_literal: true

class Quizzes::ClonesController < ApplicationController
  before_action :load_quiz, only: :create

  def create
    QuizCloneService.new(@quiz, quiz_params).process!
    render_notice(t("successfully_cloned", entity: "Quiz"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def load_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    end
end
