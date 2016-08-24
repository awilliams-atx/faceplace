class ChangeNotificationsUserToNotifierNotified < ActiveRecord::Migration
  def change
    rename_column :notifications, :user_id, :notified_id
    add_column :notifications, :  validates :notifiable_id, :notifiable_type,
      :notified_id, :notifier_id, presence: true

    notifier_id, :integer, null: false
  end
end
