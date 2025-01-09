# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :load_category, only: %i[update destroy]

  def index
    @categories = Category.order(:sort_order).all
  end

  def create
    Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    render_notice(t("successfully_updated", entity: "Category"))
  end

  def destroy
    DeleteCategoryService.new(@category, params).process!
    render_notice(t("successfully_deleted", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category
      @category = Category.find(params[:id])
    end
end
