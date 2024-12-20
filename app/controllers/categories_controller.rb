# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  before_action :load_category, only: %i[update destroy]

  def index
    @categories = Category.includes(:quizzes).order(:sort_order).all
  end

  def create
    Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    render_notice(t("successfully_updated", entity: "Category"))
  end

  def bulk_update
    bulk_update_params[:order].each do |item|
      category = Category.find(item[:id])
      category.update(sort_order: item[:sort_order])
    end
    render_notice(t("order_updated"))
  end

  def destroy
    DeleteCategoryService.new(@category, params).process!
    render_notice(t("successfully_deleted", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def bulk_update_params
      params.require(:categories).permit(order: [:id, :sort_order])
    end

    def load_category
      @category = Category.find(params[:id])
    end
end
