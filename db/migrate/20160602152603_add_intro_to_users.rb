class AddIntroToUsers < ActiveRecord::Migration
  def change
    add_column :users, :description, :text
    add_column :users, :company, :string
    add_column :users, :position, :string
    add_column :users, :location, :string
    add_column :users, :hometown, :string
  end
end
