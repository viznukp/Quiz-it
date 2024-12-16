# frozen_string_literal: true

class QuizzesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :stats
  before_action :load_quiz, only: %i[update destroy clone]
  before_action :load_quizzes, only: %i[bulk_update bulk_destroy]
  after_action :verify_authorized, except: %i[index stats]
  after_action :verify_policy_scoped, only: :index
  before_action :authorize_if_user_is_admin_and_creator_of_quiz, only: %i[update destroy]

  def index
    scoped_quizzes = policy_scope(Quiz.all)
    @filtered_quizzes, @quizzes_metadata = QuizFilterService.new(params[:filters], scoped_quizzes).process!
    @pagination_metadata, @paginated_quizzes = PaginationService.new(params, @filtered_quizzes).paginate
  end

  def create
    quiz = Quiz.new(quiz_params.merge(creator: current_user))
    authorize quiz, :admin_and_creator?
    quiz.save!
    render_notice(t("successfully_created", entity: "Quiz"))
  end

  def show
    @quiz = Quiz.includes(:questions).find_by!(slug: params[:slug])
    authorize_if_user_is_admin_and_creator_of_quiz
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
    cloned_quiz.submissions_count = 0
    cloned_quiz.name = quiz_params[:name]
    authorize cloned_quiz, :admin_and_creator?
    cloned_quiz.save!
    render_notice(t("successfully_cloned", entity: "Quiz"))
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id, :status)
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
      if @quizzes.empty?
        render_error(t("not_found", entity: "Quizzes"))
      end
    end

    def authorize_quizzes
      @quizzes.each do |quiz|
        authorize quiz, :admin_and_creator?
      end
    end

    def authorize_if_user_is_admin_and_creator_of_quiz
      authorize @quiz, :admin_and_creator?
    end
end
