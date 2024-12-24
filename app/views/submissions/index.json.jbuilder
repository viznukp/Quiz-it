# frozen_string_literal: true

json.quiz @quiz.name
json.submissions do
  json.array! @paginated_submissions do |submission|
    json.user do
      json.extract! submission.user,
        :name,
        :email
    end
    json.submission do
      json.extract! submission,
        :id,
        :correct_answers_count,
        :wrong_answers_count,
        :unanswered_count,
        :total_questions,
        :status

      json.submission_date date_and_time_from_timestamp(submission.updated_at)
    end

  end
end

json.pagination_data @pagination_metadata
