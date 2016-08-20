class Api::FriendshipsController < ApplicationController
  def destroy
    friendship = Friendship.find_by( user_id: params[:id], friend_id: current_user.id)
    friendship.destroy if friendship

    friendship = Friendship.find_by(user_id: current_user.id,friend_id: params[:id])
    friendship.destroy if friendship

    @user_id = params[:id]
    @response = 'unfriend'
    render 'api/friendships/show'
  end
end
