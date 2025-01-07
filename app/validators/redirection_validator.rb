# frozen_string_literal: true

class RedirectionValidator < ActiveModel::Validator
  def validate(redirection)
    @redirection = redirection
    @source = redirection.source
    @destination = redirection.destination

    source_and_destination_cannot_be_same
    no_cyclic_redirections
  end

  private

    def source_and_destination_cannot_be_same
      @redirection.errors.add(:destination, I18n.t("destination_cannot_be_same_as_source")) if @source == @destination
    end

    def no_cyclic_redirections
      if cycle_detected?(@source, @destination)
        @redirection.errors.add(:destination, I18n.t("cyclic_redirection"))
      end
    end

    def cycle_detected?(source, destination)
      current_redirection = Redirection.find_by(source: destination)
      while current_redirection
        return true if current_redirection.destination == source

        current_redirection = Redirection.find_by(source: current_redirection.destination)
      end

      false
    end
end
