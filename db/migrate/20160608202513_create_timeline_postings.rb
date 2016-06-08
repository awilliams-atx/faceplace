class CreateTimelinePostings < ActiveRecord::Migration
  def change
    create_table :timeline_postings do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end
  end
end
