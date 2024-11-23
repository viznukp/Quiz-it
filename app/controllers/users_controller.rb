# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    User.create!(user_params)
    render_notice(t("signup_successful"))
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
end
