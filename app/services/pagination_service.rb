# frozen_string_literal: true

class PaginationService
  DEFAULT_PAGE_SIZE = 10

  attr_reader :current_page, :page_size, :total_records

  def initialize(current_page, page_size, total_records)
    @current_page = (current_page || 1).to_i
    @page_size = (page_size || DEFAULT_PAGE_SIZE).to_i
    @total_records = total_records.to_i
  end

  def calculate_page_number
    valid_page_size = page_size > 0 ? page_size : DEFAULT_PAGE_SIZE
    max_page = (total_records.to_f / valid_page_size).ceil
    [[current_page, max_page].min, 1].max
  end
end
