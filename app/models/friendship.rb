class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend,
    class_name: "User"

  after_destroy :destroy_request

  private

  def destroy_request
    request = FriendRequest.find_by(maker_id: user_id, receiver_id: friend_id)
    request.destroy if request
    request = FriendRequest.find_by(receiver_id: user_id, maker_id: friend_id)
    request.destroy if request
  end
end
