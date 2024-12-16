# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization, only: %i[show update]

  def show
    render
  end

  def update
    @organization.update!(name: new_name, slug: new_name.parameterize)
    render_notice(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end

    def new_name
      organization_params[:name].strip
    end

    def load_organization
      @organization = Organization.first
    end
end
