# frozen_string_literal: true

class Quizzes::ClonesController < ApplicationController
  def create
    @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    QuizCloneService.new(@quiz, quiz_params).process!
    render_notice(t("successfully_cloned", entity: "Quiz"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
