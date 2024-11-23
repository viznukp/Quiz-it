# frozen_string_literal: true

Rails.application.routes.draw do
  resources :quizzes, only: :index
  resources :users, only: :create

  root "home#index"
  get "*path", to: "home#index", via: :all
end
