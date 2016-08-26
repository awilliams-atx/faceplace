class AddTimelineOwnerIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :timeline_owner_id, :integer, null: false
  end
end
