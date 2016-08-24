class Notification < ActiveRecord::Base
  validates :notifiable_id, :notifiable_type, :notified_id, :notifier_id, presence: true
  belongs_to :notifiable, polymorphic: true
  belongs_to :notified, class_name: 'User'
  belongs_to :notifier, class_name: 'User'
end
