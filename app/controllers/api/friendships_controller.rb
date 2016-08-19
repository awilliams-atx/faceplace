class Api::FriendshipsController < ApplicationController
  def destroy
    Friendship.find_by(
      user_id: params[:id],
      friend_id: current_user.id
    ).delete

    Friendship.find_by(
    user_id: current_user.id,
    friend_id: params[:id]
    ).delete

    @user_id = params[:id]
    @response = 'unfriend'
    puts "PUSHING TO friendships_#{current_user.id.to_s}"
    Pusher.trigger('friendships_' + current_user.id.to_s,
      'unfriended', { user_id: current_user.id })
    render 'api/friendships/show'
  end
end
