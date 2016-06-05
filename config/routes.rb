Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index]
    resource :user, only: [:update, :create]
    resource :session, only: [:new, :create, :destroy, :show]
    resources :friend_requests, only: [:create]
    resource :friend_request, only: [:destroy]
    resources :friendships, only: [:destroy]
  end
end
