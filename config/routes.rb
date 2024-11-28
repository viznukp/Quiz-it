# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, except: %i[new edit], param: :slug do
      member do
        post :clone
        get "question/:id", to: "quizzes#show_question", as: :show_question
      end
      collection do
        delete :bulk_destroy
      end
    end
    resources :users, only: :create
    resource :session, only: %i[create destroy]
    resources :questions, only: %i[create update destroy] do
      get "clone", to: "questions#clone", as: :clone
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
