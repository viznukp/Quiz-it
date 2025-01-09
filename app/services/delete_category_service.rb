# frozen_string_literal: true

class DeleteCategoryService
  def initialize(category, params)
    @category = category
    @params = params
  end

  def process!
    handle_delete
  end

  private

    def handle_delete
      quizzes = @category.quizzes
      quizzes.update_all(category_id: valid_replacement_category.id) if quizzes.present?
      @category.destroy!
    end

    def valid_replacement_category
      Category.find_by(id: @params[:replacement_category_id]) || create_or_find_general_category
    end

    def create_or_find_general_category
      Category.find_or_create_by(name: "General")
    end
end
