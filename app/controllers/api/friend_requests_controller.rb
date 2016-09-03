require 'json'

class Api::FriendRequestsController < ApplicationController
  before_action :require_login

  def accept
    request = FriendRequest.find_by(maker_id: accept_params[:maker_id], receiver_id: current_user.id)
    request.update(accepted: true)
    Friendship.find_or_create_by(user_id: current_user.id, friend_id: accept_params[:maker_id])
    Friendship.find_or_create_by(user_id: accept_params[:maker_id], friend_id: current_user.id)
    render json: request
  end

  def index
    @requests = (current_user.received_friend_requests.order(created_at: :asc) +
      current_user.made_friend_requests.where(accepted: true).order(created_at: :asc)).sort { |a, b| b.created_at <=> a.created_at }
    render 'api/friend_requests/index'
  end

  def create
    down_params = { maker_id: current_user.id, receiver_id: params[:receiver_id].to_i }

    unless Friendship.exists?(user_id: current_user.id, friend_id:
      params[:receiver_id].to_i)

      @request = FriendRequest.find_by(down_params)

      unless @request
        @request = FriendRequest.create!(down_params)
        rendered = render_to_string('api/friend_requests/push')
        Pusher.trigger("friend_requests_#{params[:receiver_id]}", 'received',
          rendered)
      end
    end

    render json: down_params
  end

  def destroy
      cancellation = { maker_id: current_user.id, receiver_id:
        cancel_params[:receiver_id] }
      request = FriendRequest.find_by(cancellation)
      request.destroy if request
      render json: cancellation
  end

  def mark_checked
    ids = JSON.parse(params[:checked_ids])
    @requests = []
    ids.each do |id|
      request = FriendRequest.find(id)
      if request.accepted
        request.update(acceptance_checked: true)
      else
        request.update(checked: true)
      end
      @requests << request
    end

    render 'api/friend_requests/checking'
  end

  def reject
    request = FriendRequest.find_by(maker_id: reject_params[:maker_id], receiver_id: current_user.id)
    request.destroy if request
    render json: { maker_id: reject_params[:maker_id].to_i, receiver_id: current_user.id, reject: true }
  end

  private

  def accept_params
    params.require(:accept).permit(:maker_id, :receiver_id)
  end

  def cancel_params
    params.require(:cancel).permit(:maker_id, :receiver_id)
  end

  def make_friendships
    Friendship.find_or_create_by(user_id: current_user.id, friend_id: @maker_id)
    Friendship.find_or_create_by(user_id: @maker_id, friend_id: current_user.id)
  end

  def reject_params
    params.require(:reject).permit(:maker_id, :receiver_id)
  end
end
