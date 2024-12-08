# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: %i[create create_standard_user]

  def create
    user = User.new(user_params)
    user.save!
    render_notice(t("signup_successful"))
  end

  def create_standard_user
    @user = User.find_by(email: standard_user_params[:email].downcase)
    if @user.nil?
      @user = User.new(standard_user_params)
      @user.save!
    end
  end

  private

    def user_params
      params.require(:user)
        .permit(
          :first_name,
          :last_name,
          :email,
          :password,
          :password_confirmation,
          :user_type
        )
    end

    def standard_user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
