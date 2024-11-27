# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :fetch_quiz, only: %i[create]
  before_action :load_question, only: %i[update destroy]

  def create
    question = Question.new(question_params)
    question.quiz = @quiz
    question.save!
    render_notice(t("successfully_created", entity: "Question"))
  end

  def update
    @question.update!(question_params)
    render_notice(t("successfully_updated", entity: "Question"))
  end

  def destroy
    @question.destroy!
    render_notice(t("successfully_deleted", entity: "Question"))
  end

  private

    def question_params
      params.require(:question).permit(:question, :answer_index, options: [])
    end

    def fetch_quiz
      @quiz = Quiz.find_by!(slug: params[:question][:quiz_slug])
    end

    def load_question
      @question = Question.find_by!(id: params[:id])
    end
end
