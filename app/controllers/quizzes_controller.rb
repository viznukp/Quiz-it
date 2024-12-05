# frozen_string_literal: true

class QuizzesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index_public
  before_action :load_quiz, only: %i[update destroy clone show_question]
  before_action :load_quizzes, only: %i[bulk_update bulk_destroy]
  before_action :load_quiz_with_questions, only: %i[show show_quiz_without_answer]
  after_action :verify_authorized, except: %i[index categories index_public show show_quiz_without_answer stats]

  def index
    @pagination_metadata, @paginated_quizzes = QuizFilterService.new(params).filter_quizzes
  end

  def index_public
    @quizzes = Quiz.all
  end

  def create
    quiz = Quiz.new(quiz_params.merge(creator: current_user))
    authorize quiz
    quiz.save!
    render_notice(t("successfully_created", entity: "Quiz"))
  end

  def show
    authorize @quiz
  end

  def show_quiz_without_answer
    render
  end

  def show_question
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

  def bulk_destroy
    authorize_quizzes
    @quizzes.destroy_all
    render_notice(t("successfully_deleted", entity: "Quizzes"))
  end

  def bulk_update
    authorize_quizzes
    @quizzes.update_all(bulk_update_params[:update_fields].to_h)
    render_notice(t("successfully_updated", entity: "Quizzes"))
  end

  def clone
    cloned_quiz = @quiz.deep_clone include: :questions
    cloned_quiz.questions_count = 0
    cloned_quiz.set_slug
    authorize cloned_quiz
    cloned_quiz.save!
    render_notice(t("successfully_cloned", entity: "Quiz"))
  end

  def categories
    @categories = Quiz.distinct.pluck(:category)
  end

  def stats
    @stats = {}
    @stats[:total_quizzes] = Quiz.count
    @stats[:published_quizzes] = Quiz.where(status: "published").count
    @stats[:draft_quizzes] = Quiz.where(status: "draft").count
    # authorize OpenStruct.new(@stats)
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category, :status)
    end

    def bulk_update_params
      params.require(:quizzes)
        .permit(update_fields: [:status, :category], slugs: [])
    end

    def load_quiz
      @quiz = Quiz.find_by!(slug: params[:slug])
    end

    def load_quiz_with_questions
      @quiz = Quiz.includes(:questions).find_by!(slug: params[:slug])
    end

    def load_quizzes
      @quizzes = Quiz.where(slug: params[:quizzes][:slugs])
      if @quizzes.empty?
        render_error(t("not_found", entity: "Quizzes"))
      end
    end

    def authorize_quizzes
      @quizzes.each do |quiz|
        authorize quiz, :bulk_action?
      end
    end
end
