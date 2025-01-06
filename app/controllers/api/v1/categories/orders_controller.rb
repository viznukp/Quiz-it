# frozen_string_literal: true

class Api::V1::Categories::OrdersController < ApplicationController
  before_action :load_category, only: :update

  def update
    @category.insert_at(params[:position].to_i)
    render_notice(t("order_updated"))
  end

  private

    def load_category
      @category = Category.find(params[:category_id])
    end
end
