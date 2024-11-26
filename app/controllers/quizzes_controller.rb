# frozen_string_literal: true

class QuizzesController < ApplicationController
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

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category)
    end
end
