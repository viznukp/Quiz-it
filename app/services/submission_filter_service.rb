# frozen_string_literal: true

class SubmissionFilterService
  def initialize(params)
    @params = params
  end

  def process!
    filter_submissions
  end

  private

    def filter_submissions
      submissions = Submission.includes(:user)
        .joins(:quiz, :user).where(quizzes: { slug: @params[:slug] })

      if filter_params[:name].present?
        submissions = submissions.where(
          "LOWER(CONCAT(users.first_name, ' ', users.last_name)) LIKE ?",
          "%#{filter_params[:name].downcase}%"
        )
      end

      if filter_params[:email].present?
        submissions = submissions.where(
          "LOWER(users.email) LIKE ?",
          "%#{filter_params[:email].downcase}%"
        )
      end

      if filter_params[:status].present?
        submissions = submissions.where(status: filter_params[:status])
      end

      submissions.order(created_at: :desc)
    end

    def filter_params
      @params.fetch(:filters, {}).permit(:name, :email, :status, :page_size, :page)
    end
end
