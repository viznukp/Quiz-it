# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def show
    @organization = Organization.first
  end
end
