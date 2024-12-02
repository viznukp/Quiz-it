# frozen_string_literal: true

module ApplicationHelper
  def formatted_date(timestamp)
    timestamp.strftime("%Y %B %d")
  end

  def formatted_time(timestamp)
    ist_time = timestamp.in_time_zone("Asia/Kolkata")
    ist_time.strftime("%I:%M %p")
  end
end
