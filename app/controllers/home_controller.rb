# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    redirection = Redirection.find_by(source: request.original_url)
    redirect_to redirection.destination, status: :moved_permanently if redirection
  end
end
