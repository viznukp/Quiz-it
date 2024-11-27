# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, only: %i[index create show], param: :slug do
      get "question/:id", to: "quizzes#show_question", as: :show_question
    end
    resources :users, only: :create
    resource :session, only: %i[create destroy]
    resources :questions, only: %i[create update destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
