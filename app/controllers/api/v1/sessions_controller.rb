# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    @user = User.find_by!(email: login_params[:email].downcase)
    unless @user.authenticate(login_params[:password]) && @user.admin?
      render_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  def destroy
    @current_user = nil
    render_notice(t("session.successfully_logged_out"))
  end

  private

    def login_params
      params.require(:session).permit(:email, :password)
    end
end
