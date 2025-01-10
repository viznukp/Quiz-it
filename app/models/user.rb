# frozen_string_literal: true

class User < ApplicationRecord
  MAX_FIRST_NAME_AND_LAST_NAME_LENGTH = 35
  MIN_PASSWORD_LENGTH = 6
  MAX_EMAIL_LENGTH = 255
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  DEFAULT_PASSWORD_FOR_STANDARD_USER = "default_password"

  enum :user_type, { admin: "admin", standard: "standard" }, default: :standard

  has_secure_password
  has_secure_token :authentication_token

  belongs_to :organization
  has_many :quizzes, foreign_key: "creator_id", dependent: :destroy

  validates :first_name, :last_name, length: { maximum: MAX_FIRST_NAME_AND_LAST_NAME_LENGTH }
  validates :first_name, presence: true
  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :user_type, presence: true, inclusion: { in: user_types.keys }
  validates :organization_id, presence: true

  validates :password, presence: true, length: { minimum: MIN_PASSWORD_LENGTH }
  validates :password_confirmation, presence: true

  before_validation :set_default_password_for_standard_user, if: :standard?
  before_save :email_to_lowercase
  before_save :capitalize_name

  def name
    [first_name, last_name].join(" ").strip
  end

  private

    def set_default_password_for_standard_user
      if self.standard?
        self.password = DEFAULT_PASSWORD_FOR_STANDARD_USER
        self.password_confirmation = DEFAULT_PASSWORD_FOR_STANDARD_USER
      end
    end

    def email_to_lowercase
      email.downcase!
    end

    def capitalize_name
      self.first_name = first_name.capitalize if first_name.present?
      self.last_name = last_name.capitalize if last_name.present?
    end
end
