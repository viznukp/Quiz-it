# frozen_string_literal: true

class Submissions::ResultsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :show

  def show
    @result = ResultService.new(params).process!
  end
end
