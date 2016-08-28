class FriendRequest < ActiveRecord::Base
  validates :maker_id, uniqueness: { scope: :receiver_id }
  validates :maker_id, :receiver_id, presence: true
  
  belongs_to :maker, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
end
