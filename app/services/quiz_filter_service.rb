# frozen_string_literal: true

class QuizFilterService
  attr_reader :filters

  def initialize(filters, scoped_quizzes)
    @filters = filters
    @scoped_quizzes = scoped_quizzes || Quiz.all
  end

  def process!
    [filter_quizzes, quiz_metadata]
  end

  private

    def filter_quizzes
      quizzes = @scoped_quizzes.includes([:category])

      if filters[:category].present?
        quizzes = quizzes
          .joins(:category)
          .where("LOWER(categories.name) LIKE ?", "%#{filters[:category].downcase}%")
      end

      if filters[:status].present?
        quizzes = quizzes.where(status: filters[:status])
      end

      if filters[:accessibility].present?
        quizzes = quizzes.where(accessibility: filters[:accessibility])
      end

      if filters[:quiz_name].present?
        quizzes = quizzes.where("LOWER(quizzes.name) LIKE ?", "%#{filters[:quiz_name].downcase}%")
      end

      if filters[:order_by_category].present?
        quizzes = quizzes.joins(:category).order("categories.sort_order")
      end

      quizzes = quizzes.order(created_at: :desc)
    end

    def quiz_metadata
      count_by_status = @scoped_quizzes.group(:status).count
      {
        result_type: filters[:status] || "all",
        total_quizzes: @scoped_quizzes.count,
        published_quizzes: count_by_status.fetch("published", 0),
        draft_quizzes: count_by_status.fetch("draft", 0)
      }
    end
end
