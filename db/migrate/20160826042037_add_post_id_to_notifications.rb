class AddPostIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :post_id, :integer, null: false
  end
end
