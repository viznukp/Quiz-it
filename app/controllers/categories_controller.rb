# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index

  def index
    @categories = Category.all
  end
end
