Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do

    resource :session, only: [:new, :create, :destroy, :show]

    resources :users, only: [:show, :index]
    resource :user, only: [:update, :create]
    get '/users/:id/most_recently_added',
      to: 'users#most_recently_added',
      as: 'most_recently_added'

    resources :friend_requests, only: [:create]
    resource :friend_request, only: [:destroy]

    resources :friendships, only: [:destroy]
  end
end
