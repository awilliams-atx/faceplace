class CreateComments < ActiveRecord::Migration
  def change
    drop_table :comments
    
    create_table :comments do |t|
      t.text :body
      t.integer :commentable_id
      t.string :commentable_type

      t.timestamps
    end

    add_index :comments, :commentable_id
  end
end
