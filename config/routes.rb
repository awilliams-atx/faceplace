Rails.application.routes.draw do
  root to: 'static_pages#root'

  get '/auth/facebook/callback', to: 'api/sessions#omniauth_create'

  namespace :api, defaults: { format: :json } do

    # --------------------------------COMMENT-------------------------------- #

    resources :comments, only: [:index, :update, :destroy] do
      resources :comments, only: [:create, :index]
    end

    # -----------------------------FRIEND REQUEST----------------------------- #

    resources :friend_requests, only: [:create]
    resource :friend_request, only: [:destroy]

    # -------------------------------FRIENDSHIP------------------------------- #

    resources :friendships, only: [:destroy]

    # -----------------------------NOTIFICATIONS----------------------------- #

    resources :notifications, only: [:index]

    # ----------------------------------POST---------------------------------- #

    get 'posts/:id/tagged_friends', to: 'posts#tagged_friends'

    resources :posts, only: [:index, :show, :create, :destroy, :update] do
      resources :comments, only: [:create, :index]
    end

    # --------------------------------SESSION-------------------------------- #

    resource :session, only: [:new, :create, :destroy, :show]

    # ----------------------------------USER---------------------------------- #

    get '/users/search', to: 'users#search'

    resources :users, only: [:show, :index] do
      resources :posts, only: [:index]
    end

    resource :user, only: [:update, :create]

    post 'user/cover_photo', to: 'users#update_cover_photo'
    post 'user/profile_pic', to: 'users#update_profile_pic'

    get '/users/:id/most_recently_added',
    to: 'users#most_recently_added'
  end
end
