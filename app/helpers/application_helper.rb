# frozen_string_literal: true

module ApplicationHelper
  def date_from_timestamp(timestamp)
    parsed_timestamp(timestamp).strftime("%d %B %Y")
  end

  def time_from_timestamp(timestamp)
    parsed_timestamp(timestamp).in_time_zone("Asia/Kolkata").strftime("%I:%M %p")
  end

  def date_and_time_from_timestamp(timestamp)
    [
      date_from_timestamp(timestamp),
      time_from_timestamp(timestamp)
    ].join(", ").strip
  end

  private

    def parsed_timestamp(timestamp)
      timestamp.is_a?(String) ? DateTime.parse(timestamp) : timestamp
    end
end
