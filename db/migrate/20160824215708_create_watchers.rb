class CreateWatchers < ActiveRecord::Migration
  def change
    create_table :watchers do |t|
      t.integer :watchable_id, null: false
      t.string :watchable_type, null: false
      t.integer :watcher_id, null: false
    end

    add_index :watchers, [:watchable_id, :watcher_id], unique: true
  end
end
