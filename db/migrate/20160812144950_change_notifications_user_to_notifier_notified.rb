class ChangeNotificationsUserToNotifierNotified < ActiveRecord::Migration
  def change
    rename_column :notifications, :user_id, :notified_user_id
    add_column :notifications, :notifying_user_id, :integer, null: false
  end
end
