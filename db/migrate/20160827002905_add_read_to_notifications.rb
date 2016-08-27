class AddReadToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :read, :boolean, default: false
  end
end
