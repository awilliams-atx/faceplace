class AddImageableTypeToImages < ActiveRecord::Migration
  def change
    add_column :images, :imageable_type, :string, null: false
  end
end
