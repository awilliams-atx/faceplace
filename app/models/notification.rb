class Notification < ActiveRecord::Base
  validates :notifiable_id, :notifiable_type, :user_id, presence: true
  belongs_to :notifiable, polymorphic: true
  belongs_to :user
end
