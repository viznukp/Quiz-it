# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_organization

  def create
    @current_organization.users.create!(user_params.merge(user_type: "admin"))
    render_notice(t("signup_successful"))
  end

  def create_standard_user
    @user = User.find_by(email: standard_user_params[:email].downcase)
    @user = @current_organization.users.create!(standard_user_params) if @user.nil?
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
        )
    end

    def standard_user_params
      user_params.except(:password, :password_confirmation)
    end

    def load_organization
      @current_organization = Organization.first
    end
end
