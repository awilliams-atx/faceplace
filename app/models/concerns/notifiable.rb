module Notifiable
  extend ActiveSupport::Concern
  included do
    has_many :notifications, as: :notifiable
  end

  def make_notification(user_id)
    notif = Notification.new
    notif.notifiable_type = self.class.to_s
    notif.notifiable_id = self.id
    notif.user_id = user_id
    notif.save!
  end
end
