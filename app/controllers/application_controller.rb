# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiExceptions
  include Authenticable
  include Pundit::Authorization

  def curent_user
    "respo"
  end

  private

    def current_user
      @current_user
    end
end
