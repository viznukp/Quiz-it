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
        get :stats
      end
    end
    resources :users, only: :create do
      post :create_standard_user, on: :collection
    end
    resource :session, only: %i[create destroy]
    resources :questions, only: %i[create update destroy] do
      get :clone
    end

    resources :submissions, only: %i[index create], param: :slug do
      get :result, on: :member
      collection do
        resource :report, only: %i[create], module: :submissions do
          get :download, on: :collection
        end
      end
    end

    resource :organization, only: %i[show update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
