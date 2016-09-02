class Api::FriendshipsController < ApplicationController
  before_action :require_login
  after_action :destroy_request, only: :destroy

  def destroy
    friendship = Friendship.find_by( user_id: params[:id], friend_id: current_user.id)
    friendship.destroy if friendship

    friendship = Friendship.find_by(user_id: current_user.id,friend_id: params[:id])
    friendship.destroy if friendship

    @user_id = params[:id]
    @response = 'unfriend'
    render 'api/friendships/show'
  end

  private

  def destroy_request
    request = FriendRequest.find_by(maker_id: current_user.id, receiver_id: params[:id])
    request.destroy if request

    request = FriendRequest.find_by(maker_id: params[:id], receiver_id: current_user.id)
    request.destroy if request
  end
end
