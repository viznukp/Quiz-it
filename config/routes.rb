# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, except: %i[new edit], param: :slug do
      member do
        post :clone
      end
      collection do
        delete :bulk_destroy
        put :bulk_update
      end
    end
    resources :users, only: :create do
      post :create_standard_user, on: :collection
    end
    resources :questions, only: %i[create show update destroy] do
      get :clone, on: :member
    end

    resources :submissions, only: %i[index create], param: :slug do
      get :result, on: :member
      collection do
        get :check
        resource :report, only: %i[create], module: :submissions do
          get :download, on: :collection
        end
      end
    end
    resource :session, only: %i[create destroy]
    resource :organization, only: %i[show update]
    resources :categories, only: :index
    namespace :public do
      resources :quizzes, only: %i[index show], param: :slug
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
