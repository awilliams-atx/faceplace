Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show]
    resource :user, only: [:update, :create]
    resource :session, only: [:new, :create, :destroy, :show]
  end
end
