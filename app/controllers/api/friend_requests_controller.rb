class Api::FriendRequestsController < ApplicationController
  def create
    return if !logged_in?
    @request = FriendRequest.new(maker_id: current_user.id,
      receiver_id: params[:request_receiver_id])

    @request.save!
    @request.make_notification(notifiying_user_id: current_user.id,
      notified_user_id: params[:request_receiver_id])

    render json: @request
  end

  def destroy
    if friend_request_params[:response] == 'cancel'
      friend_request = FriendRequest.find_by(
      maker_id: current_user.id,
      receiver_id: friend_request_params[:receiver_id]
      )

      friend_request.destroy

      @user_id = friend_request_params[:receiver_id]
      @response = 'canceled'
    else
      if friend_request_params[:response] == 'accept'
        Friendship.create(
        user_id: current_user.id,
        friend_id: friend_request_params[:maker_id]
        )

        Friendship.create(
        user_id: friend_request_params[:maker_id],
        friend_id: current_user.id
        )
      end

      friend_request = FriendRequest.find_by(
      maker_id: friend_request_params[:maker_id],
      receiver_id: current_user.id
      )

      unless friend_request
        friend_request = FriendRequest.find_by(
        maker_id: current_user.id,
        receiver_id: friend_request_params[:maker_id]
        )
      end

      friend_request.destroy

      @user_id = friend_request_params[:maker_id]
      @response = friend_request_params[:response]
    end

    render 'api/friendships/show'
  end

  private

  def friend_request_params
    params.require(:friend_request).permit(:maker_id, :receiver_id, :response)
  end
end
