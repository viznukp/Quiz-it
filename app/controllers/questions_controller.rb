# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_question, only: %i[update destroy clone]
  before_action :load_quiz, only: %i[create show]

  def create
    @current_quiz.questions.create!(question_params)
    render_notice(t("successfully_created", entity: "Question"))
  end

  def show
    @question = @current_quiz.questions.find(params[:id])
  end

  def update
    @question.update!(question_params)
    render_notice(t("successfully_updated", entity: "Question"))
  end

  def destroy
    @question.destroy!
    render_notice(t("successfully_deleted", entity: "Question"))
  end

  def clone
    @question.deep_clone.save!
    render_notice(t("successfully_cloned", entity: "Question"))
  end

  private

    def question_params
      params.require(:question).permit(:question, :answer_index, options: [])
    end

    def load_question
      @question = Question.find(params[:id])
    end

    def load_quiz
      @current_quiz = Quiz.find_by!(slug: params[:slug])
    end
end
