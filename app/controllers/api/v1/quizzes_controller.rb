# frozen_string_literal: true

class Api::V1::QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[update destroy]
  before_action :load_quizzes, only: %i[bulk_update bulk_destroy]
  after_action :verify_authorized, only: :show
  after_action :verify_policy_scoped, only: :index

  def index
    scoped_quizzes = policy_scope(Quiz.all)
    @filter_result = QuizFilterService.new(filter_params, scoped_quizzes).process!
    @pagination_metadata, @paginated_quizzes = PaginationService.new(params, @filter_result[:quizzes]).process!
  end

  def create
    current_user.quizzes.create!(quiz_params)
    render_notice(t("successfully_created", entity: "Quiz"))
  end

  def show
    @quiz = Quiz.includes(:questions).find_by!(slug: params[:slug])
    authorize @quiz, :admin_and_creator?
  end

  def update
    @quiz.update!(quiz_params)
    render_notice(t("successfully_updated", entity: "Quiz"))
  end

  def destroy
    @quiz.destroy!
    render_notice(t("successfully_deleted", entity: "Quiz"))
  end

  def bulk_destroy
    @quizzes.destroy_all
    render_notice(t("successfully_deleted", entity: "Quizzes"))
  end

  def bulk_update
    @quizzes.update_all(bulk_update_params[:update_fields].to_h)
    render_notice(t("successfully_updated", entity: "Quizzes"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(
        :name,
        :category_id,
        :status,
        :accessibility,
        :time_limit,
        :email_notification,
        :randomize_questions,
        :randomize_options
      )
    end

    def bulk_update_params
      params.require(:quizzes)
        .permit(update_fields: [:status, :category_id], slugs: [])
    end

    def load_quiz
      @quiz = Quiz.find_by!(slug: params[:slug])
    end

    def load_quizzes
      @quizzes = Quiz.where(slug: params[:quizzes][:slugs])
      render_error(t("not_found", entity: "Quizzes")) if @quizzes.empty?
    end

    def filter_params
      params[:filters] || {}
    end
end
