class AddNotifierNameToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :notifier_name, :string
  end
end
