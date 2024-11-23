# frozen_string_literal: true

class UsersController < ApplicationController
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
          :password_confirmation
        )
    end
end
