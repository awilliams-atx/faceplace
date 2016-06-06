class DropFriendings < ActiveRecord::Migration
  def change
    drop_table :friendings
  end
end
