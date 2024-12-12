# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization, only: %i[show update]

  def show
    render
  end

  def update
    @organization.update!(name: organization_params[:name].strip)
    render_notice(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end

    def load_organization
      @organization = Organization.first
    end
end
