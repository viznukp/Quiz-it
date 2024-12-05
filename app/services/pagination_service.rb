# frozen_string_literal: true

class PaginationService
  DEFAULT_PAGE_SIZE = 10

  include Pagy::Backend

  def initialize(params, entity)
    @entity = entity
    @params = params
  end

  def paginate
    current_page = (pagination_params[:page] || 1).to_i
    page_size = (pagination_params[:page_size] || DEFAULT_PAGE_SIZE).to_i
    total_records = @entity.count
    valid_page_size = page_size > 0 ? page_size : DEFAULT_PAGE_SIZE
    max_page = (total_records.to_f / valid_page_size).ceil
    page = [[current_page, max_page].min, 1].max
    pagy(@entity, limit: page_size, page:)
  end

  private

    def pagination_params
      @params.fetch(:filters, {}).permit(:page_size, :page)
    end
end
