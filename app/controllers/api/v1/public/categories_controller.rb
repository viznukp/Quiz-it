class Api::V1::Public::CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index

  def index
    @categories = Category.order(:sort_order).all
  end
end
