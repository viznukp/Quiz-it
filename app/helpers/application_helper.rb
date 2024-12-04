# frozen_string_literal: true

module ApplicationHelper
  def date_from_timestamp(timestamp)
    timestamp.strftime("%Y %B %d")
  end

  def time_from_timestamp(timestamp)
    ist_time = timestamp.in_time_zone("Asia/Kolkata")
    ist_time.strftime("%I:%M %p")
  end

  def date_and_time_from_timestamp(timestamp)
    [date_from_timestamp(timestamp), time_from_timestamp(timestamp)].join(", ").strip
  end
end
