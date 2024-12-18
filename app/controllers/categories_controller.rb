# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index

  def index
    @categories = Category.includes(:quizzes).order(:sort_order).all
  end

  def create
    Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  def bulk_update
    bulk_update_params[:order].each do |item|
      puts item
      category = Category.find(item[:id])
      category.update(sort_order: item[:sort_order])
    end
    render_notice(t("order_updated"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def bulk_update_params
      params.require(:categories).permit(order: [:id, :sort_order])
    end
end
