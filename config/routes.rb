# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, except: %i[new edit], param: :slug do
      member do
        post :clone
        get "question/:id", to: "quizzes#show_question", as: :show_question
        get :show_quiz_without_answer
      end
      collection do
        delete :bulk_destroy
        post :bulk_update
        get :index_public
        get :categories
      end
    end
    resources :users, only: :create do
      collection do
        post :create_standard_user
      end
    end
    resource :session, only: %i[create destroy]
    resources :questions, only: %i[create update destroy] do
      get "clone", to: "questions#clone", as: :clone
    end

    resources :submissions, only: %i[index create]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
