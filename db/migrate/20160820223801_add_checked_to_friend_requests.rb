class AddCheckedToFriendRequests < ActiveRecord::Migration
  def change
    add_column :friend_requests, :checked, :boolean, default: false
  end
end
