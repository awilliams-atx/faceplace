class FriendRequest < ActiveRecord::Base
  validates :maker_id, uniqueness: { scope: :receiver_id }
  validates :maker_id, :receiver_id, presence: true
  belongs_to :maker
  belongs_to :receiver
end
