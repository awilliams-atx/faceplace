class ChangeNotificationsUserColumnNames < ActiveRecord::Migration
  def change
    rename_column :notifications, :notifying_user_id, :notifier_id
    rename_column :notifications, :notified_user_id, :notified_id
  end
end
