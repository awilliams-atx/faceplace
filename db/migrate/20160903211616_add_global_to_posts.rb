class AddGlobalToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :global, :boolean, default: false
  end
end
