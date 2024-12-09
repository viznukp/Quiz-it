# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Submissions::ReportsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    @quiz = create(:quiz)
    @submission = create(:submission, user:, quiz: @quiz)
    @headers = headers(user)
    Sidekiq::Testing.inline!
    @pdf_report_path = Rails.root.join("tmp/submission_report.pdf")
  end

  def create_submission_report
    post report_path, params: { submission: { slug: @quiz.slug } }, headers: @headers
  end

  def test_should_create_submission_report_for_given_quiz
    create_submission_report
    assert File.exist?(@pdf_report_path)
    File.delete(@pdf_report_path) if File.exist?(@pdf_report_path)
  end

  def test_should_download_report_if_report_exists
    create_submission_report
    get download_report_path, params: { response_type: "blob" }, headers: @headers

    assert_response :success
    assert_equal "application/pdf", response.content_type

    assert_includes response.headers["Content-Disposition"], "attachment"
    File.delete(@pdf_report_path) if File.exist?(@pdf_report_path)
  end

  def test_should_return_not_found_if_report_file_does_not_exist
    File.delete(@pdf_report_path) if File.exist?(@pdf_report_path)

    get download_report_path, params: { response_type: "blob" }, headers: @headers

    assert_response :not_found
    assert_includes response.body, I18n.t("not_found", entity: "report")
  end
end
