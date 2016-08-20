class Api::FriendRequestsController < ApplicationController
  before_action :require_login

  def index
    @requests = current_user.received_friend_requests.includes(:maker)
    render 'api/friend_requests/index'
  end

  def create
    down_params = { name: current_user.full_name, maker_id: current_user.id, receiver_id: params[:receiver_id].to_i }

    unless Friendship.exists?(user_id: current_user.id, friend_id:
      params[:receiver_id])

      @request = FriendRequest.find_or_create_by(maker_id: current_user.id,
        receiver_id: params[:receiver_id])

      Pusher.trigger("friend_requests_#{params[:receiver_id]}", 'received',
        down_params.merge(profile_pic_url: current_user.profile_pic.url))
    end

    render json: down_params
  end

  def destroy
    # User canceling own request, regardless if already accepted/rejected
    if params.has_key?(:cancellation)
      cancellation = { maker_id: current_user.id, receiver_id:
        cancel_params[:receiver_id] }
      request = FriendRequest.find_by(cancellation)
      request.destroy if request
      render json: cancellation.merge(cancel: true)
      return
    end

    # User responding to request
    @maker_id = response_params[:maker_id].to_i
    base_params = { receiver_id: current_user.id, maker_id: @maker_id }

    request = FriendRequest.find_by(base_params)
    request_accepted = request && response_params[:accept]
    request_rejected = request && response_params[:reject]
    request_canceled = !request

    if request_accepted
      request.destroy
      make_friendships
      acceptance = base_params.merge(accept: true)
      render json: acceptance
    elsif request_rejected
      request.destroy
      render json: base_params.merge(reject: true)
    elsif request_canceled
      render json: base_params.merge(reject: true)
    end
  end

  private

  def cancel_params
    params.require(:cancellation)
      .permit(:maker_id, :receiver_id, :cancel)
  end

  def make_friendships
    Friendship.find_or_create_by(user_id: current_user.id, friend_id: @maker_id)
    Friendship.find_or_create_by(user_id: @maker_id, friend_id: current_user.id)
  end

  def response_params
    params.require(:response)
      .permit(:maker_id, :receiver_id, :accept, :reject)
  end
end
