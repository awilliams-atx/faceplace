class AddCheckedToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :checked, :boolean, default: false
  end
end
