# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |request| request.format == :json }) do
    resources :quizzes, except: %i[new edit], param: :slug do
      resource :clone, only: :create, on: :member, module: :quizzes
      collection do
        delete :bulk_destroy
        put :bulk_update
      end
    end
    resources :users, only: :create do
      post :create_standard_user, on: :collection
    end
    resources :questions, only: %i[create show update destroy] do
      resource :clone, only: :create, on: :member, module: :questions
    end

    resources :submissions, only: %i[index create], param: :slug do
      resource :result, only: :show, on: :member, module: :submissions
      collection do
        resource :report, only: :create, module: :submissions do
          get :download, on: :collection
        end
      end
    end
    resource :session, only: %i[create destroy]
    resource :organization, only: %i[show update]
    resources :categories, only: %i[index create update destroy] do
      put :bulk_update, on: :collection
    end
    namespace :public do
      resources :quizzes, only: %i[index show], param: :slug
      resources :questions, only: :show, param: :slug
    end
    resources :redirections, only: %i[index create update destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
