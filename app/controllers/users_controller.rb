# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    user = User.new(user_params)
    user.organization = build_organization_for_user
    user.save!
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

    def build_organization_for_user
      organization = Organization.first
      if organization.nil?
        organization = Organization.new(name: "Big Binary Academy")
        organization.save!
      end
      organization
    end
end
