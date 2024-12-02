# frozen_string_literal: true

json.submissions do
  json.array! @submissions do |submission|
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
        :status

      json.submission_date [formatted_date(submission.updated_at), formatted_time(submission.updated_at)].join(" ").strip
    end

  end
end
