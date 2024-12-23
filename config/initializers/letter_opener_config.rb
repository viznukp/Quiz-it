# frozen_string_literal: true

LetterOpener.configure do |config|
  config.location = Rails.root.join("tmp/letter_opener")
  # config.message_template = :light
  config.file_uri_scheme = "file://wsl.localhost/Ubuntu"
end
