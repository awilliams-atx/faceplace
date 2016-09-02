class AddAcceptanceCheckedToFriendRequests < ActiveRecord::Migration
  def change
    add_column :friend_requests, :acceptance_checked, :boolean, default: false
  end
end
