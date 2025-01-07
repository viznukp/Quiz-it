# frozen_string_literal: true

module Redirectable
  extend ActiveSupport::Concern

  included do
    before_action :redirect
  end

  private

    def redirect
      redirection = Redirection.find_by(source: request.original_url)
      redirect_to redirection.destination, allow_other_host: true, status: :moved_permanently if redirection
    end
end
