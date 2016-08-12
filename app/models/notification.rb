class Notification < ActiveRecord::Base
  validates :notifiable_id, :notifiable_type, :notified_user_id, :notifying_user_id, presence: true
  belongs_to :notifiable, polymorphic: true
  belongs_to :notified_user, class_name: 'User'
  belongs_to :notifying_user, class_name: 'User'
end
