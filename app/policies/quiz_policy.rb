# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def create?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  def show?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  def show_question?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  def destroy?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  def update?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  def clone?
    authorize_if_user_is_admin_and_quiz_creator_is_current_user
  end

  private

    def authorize_if_user_is_admin_and_quiz_creator_is_current_user
      user.admin? && quiz.creator_id == user.id
    end
end
