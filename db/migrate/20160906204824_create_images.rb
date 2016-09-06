class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :imageable_id, null: false
      t.timestamps
    end
  end
end
