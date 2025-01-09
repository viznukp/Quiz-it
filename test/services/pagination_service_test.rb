# frozen_string_literal: true

require "test_helper"

class PaginationServiceTest < ActionDispatch::IntegrationTest
  def setup
    category = create(:category)
    @quizzes = create_list(:quiz, 10, category:)
    @page_size = 5
  end

  def test_should_return_specified_number_of_entities
    @pagination_metadata, @paginated_quizzes = PaginationService.new(pagination_params(@page_size), Quiz.all).process!
    assert_equal @paginated_quizzes.size, @page_size
  end

  def test_should_return_default_page_size_number_of_entities_when_page_size_is_not_given
    @pagination_metadata, @paginated_quizzes = PaginationService.new(pagination_params(nil), Quiz.all).process!
    assert_equal @paginated_quizzes.size, default_page_size
  end

  private

    def pagination_params(page_size)
      ActionController::Parameters.new(
        { filters: { page: 1, page_size: } }
      )
    end
end
