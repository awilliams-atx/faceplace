class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :maker_id, null: false
      t.integer :receiver_id, null: false

      t.timestamps
    end

    add_index :friend_requests, [:maker_id, :receiver_id], unique: true
  end
end
