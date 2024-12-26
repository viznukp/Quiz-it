# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, only: :update

  def create
    Redirection.create!(redirection_params)
    render_notice(t("successfully_created", entity: "Redirection"))
  end

  def index
    @redirections = Redirection.all.order(updated_at: :desc)
  end

  def update
    @redirection.update(redirection_params)
    render_notice(t("successfully_updated", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:source, :destination)
    end

    def load_redirection
      @redirection = Redirection.find(params[:id])
    end
end
