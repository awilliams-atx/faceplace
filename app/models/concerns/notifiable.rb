module Notifiable
  extend ActiveSupport::Concern
  included do
    has_many :notifications, as: :notifiable
  end

  def make_notification(options)
    notif = Notification.new
    notif.notifiable_type = self.class.to_s
    notif.notifiable_id = self.id
    notif.notifier_id = options[:notifier_id]
    notif.notified_id = options[:notified_id]
    notif.save!
  end
end
