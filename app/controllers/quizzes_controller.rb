# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[update destroy clone]
  after_action :verify_authorized, except: :index

  def index
    @quizzes = Quiz.all
    render
  end

  def create
    quiz = Quiz.new(quiz_params.merge(creator: current_user))
    authorize quiz
    quiz.save!
    render_notice(t("successfully_created", entity: "Quiz"))
  end

  def show
    @quiz = Quiz.includes(:questions).find_by!(slug: params[:slug])
    authorize @quiz
  end

  def show_question
    @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    authorize @quiz
    @question = @quiz.questions.find_by!(id: params[:id])
  end

  def update
    authorize @quiz
    @quiz.update!(quiz_params)
    render_notice(t("successfully_updated", entity: "Quiz"))
  end

  def destroy
    authorize @quiz
    @quiz.destroy!
    render_notice(t("successfully_deleted", entity: "Quiz"))
  end

  def clone
    cloned_quiz = @quiz.deep_clone include: :questions
    cloned_quiz.set_slug
    authorize cloned_quiz
    cloned_quiz.save!
    render_notice(t("successfully_cloned", entity: "Quiz"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category, :status)
    end

    def load_quiz
      @quiz = Quiz.find_by!(slug: params[:slug])
    end
end
