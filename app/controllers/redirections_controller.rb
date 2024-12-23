# frozen_string_literal: true

class RedirectionsController < ApplicationController
  def create
    Redirection.create!(redirection_params)
    render_notice(t("successfully_created", entity: "Redirection"))
  end

  def index
    @redirections = Redirection.all
  end

  private

    def redirection_params
      params.require(:redirection).permit(:source, :destination)
    end
end
