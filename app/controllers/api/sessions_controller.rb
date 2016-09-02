class Api::SessionsController < ApplicationController
  before_action :require_login, only: :destroy
  after_action :receive_friend_request, only: :create

  def new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      log_in(@user)
      render 'api/users/current_user'
    else
      render json: {
        login: "Incorrect email or password"
      }, status: 401
    end
  end

  def omniauth_create
    @user = User.find_or_create_by_auth_hash(auth_hash)

    log_in(@user)

    redirect_to root_url + '#/'
  end

  def destroy
    log_out
    render json: {}
  end

  def show
    @user = current_user
    if current_user
      render 'api/users/current_user'
    else
      render json: {}
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def receive_friend_request
    return if !@user || @user.email != 'jeff'
    andrew = User.find_by(email: 'andrew')
    friendship = Friendship.find_by(user_id: @user.id, friend_id: andrew.id)
    friendship.destroy if friendship
    friendship = Friendship.find_by(user_id: andrew.id, friend_id: @user.id)
    friendship.destroy if friendship
    request = FriendRequest.find_by(maker_id: andrew.id, receiver_id: @user.id)
    unless request
      FriendRequest.create!(maker_id: andrew.id, receiver_id: @user.id)
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
