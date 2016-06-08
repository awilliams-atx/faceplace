class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :post_id, null: false
      t.integer :tagged_id, null: false

      t.timestamps
    end
  end
end
