class CreateFriendings < ActiveRecord::Migration
  def change
    create_table :friendings do |t|
      t.integer :gentleman_id, null: false
      t.integer :lady_id, null: false
    end
  end
end
