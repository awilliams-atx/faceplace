Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do

    resource :session, only: [:new, :create, :destroy, :show]

    resources :users, only: [:show, :index] do
      resources :posts, only: [:index]
    end
    resource :user, only: [:update, :create]
    get '/users/:id/most_recently_added',
      to: 'users#most_recently_added'

    get '/users/:id/friends_for_tagging',
      to: 'users#friends_for_tagging'

    resources :friend_requests, only: [:create]
    resource :friend_request, only: [:destroy]

    resources :friendships, only: [:destroy]

    resources :posts, only: [:index, :create, :destroy, :update]
  end
end
