# frozen_string_literal: true

class Questions::ClonesController < ApplicationController
  def create
    question = Question.find(params[:question_id])
    question.deep_clone.save!
    render_notice(t("successfully_cloned", entity: "Question"))
  end
end
