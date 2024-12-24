class Public::QuestionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :check_if_already_attempted, only: :show

  def show
    @questions = @quiz.questions.order(questions_order)
  end

  private

  def load_quiz
    @quiz = Quiz.includes(:questions).find_by!(slug: params[:slug])
  end

  def check_if_already_attempted
    load_quiz
    user = User.find(params[:user_id])
    submission = Submission.find_by(user: user, quiz: @quiz)
    render_error(t("user_already_attempted_quiz"), :conflict) if submission
  end

  def questions_order
    @quiz.randomize_questions ? "RANDOM()" : :created_at
  end
end
