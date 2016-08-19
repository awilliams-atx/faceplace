class Api::FriendRequestsController < ApplicationController
  def index
    @requests = current_user.received_friend_requests.includes(:maker)
    render 'api/friend_requests/index'
  end

  def create
    return if !logged_in?
    @request = FriendRequest.new({
      maker_id: current_user.id,
      receiver_id: params[:request_receiver_id]
    })

    @request.save!
    render json: { request_made: true }
    Pusher.trigger "friend_requests_#{params[:request_receiver_id].to_i}",
      'received',
      {
        profile_pic_url: current_user.profile_pic.url,
        name: current_user.full_name,
        user_id: current_user.id
      }
  end

  def destroy
    return cancel if request_params[:cancel]

    @maker_id = request_params[:maker_id]
    base_params = { receiver_id: current_user.id, maker_id: @maker_id }

    request = FriendRequest.find_by(maker_id: @maker_id, receiver_id:
      current_user.id)

    if request
      accept_response = 'accept'
      request.destroy
    else
      accept_response = 'reject'
    end

    if request_params[:response] == 'accept'
      make_friendships
      acceptance = base_params.merge(response: accept_response)
      render json: acceptance
      Pusher.trigger("friendships_#{@maker_id}", 'accept', acceptance)
    elsif request_params[:response] == 'reject'
      render json: base_params.merge(response: 'reject')
    end
  end

  private

  def make_friendships
    Friendship.create(user_id: current_user.id, friend_id: @maker_id)
    Friendship.create(user_id: @maker_id, friend_id: current_user.id)
  end

  def cancel
    cancellation = { maker_id: current_user.id, receiver_id: request_params[:receiver_id] }
    request = FriendRequest.find_by(cancellation)
    request.destroy if request
    render json: cancellation
  end

  def request_params
    params.require(:friend_request)
      .permit(:maker_id, :receiver_id, :response, :cancel)
  end
end
