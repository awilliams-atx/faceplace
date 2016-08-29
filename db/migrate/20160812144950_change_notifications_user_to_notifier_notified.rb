class ChangeNotificationsUserToNotifierNotified < ActiveRecord::Migration
  def change
    rename_column :notifications, :user_id, :notified_id
    add_column :notifications, :notifier_id, :integer, null: false
  end
end
