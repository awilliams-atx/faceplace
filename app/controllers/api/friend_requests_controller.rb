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
    pusher_params = {}
    if friend_request_params[:response] == 'cancel'
      friend_request = FriendRequest.find_by({
        maker_id: current_user.id,
        receiver_id: friend_request_params[:receiver_id]
      })


      friend_request.destroy

      @user_id = friend_request_params[:receiver_id]
      @response = 'canceled'
      pusher_channel = "requests_#{current_user.id}"
      pusher_event = 'canceled'
    else
      if friend_request_params[:response] == 'accept'
        maker_id = friend_request_params[:maker_id]

        Friendship.create({
          user_id: current_user.id,
          friend_id: maker_id
        })

        Friendship.create({
          user_id: maker_id,
          friend_id: current_user.id
        })
        puts "ACCEPTING AND PUSHING TO friendships_#{maker_id}"
        pusher_channel = "friendships_#{maker_id}"
        pusher_alert = 'friended'
        pusher_params[:receiver_id] = current_user.id
        pusher_params[:maker_id] = friend_request_params[:maker_id].to_i
        pusher_params[:response] = 'accept'
      end

      friend_request = FriendRequest.find_by({
        maker_id: friend_request_params[:maker_id],
        receiver_id: current_user.id
      })

      unless friend_request
        friend_request = FriendRequest.find_by({
          maker_id: current_user.id,
          receiver_id: friend_request_params[:maker_id]
        })
      end

      friend_request.destroy

      @user_id = friend_request_params[:maker_id]
      @response = friend_request_params[:response]
    end

    if pusher_alert
      Pusher.trigger(pusher_channel, pusher_alert, pusher_params)
    end
    render 'api/friendships/show'
  end

  private

  def friend_request_params
    params.require(:friend_request).permit(:maker_id, :receiver_id, :response)
  end
end
