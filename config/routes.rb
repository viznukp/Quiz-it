# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, only: :index
    resources :users, only: :create
    resource :session, only: :create
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
