class AddExplanationToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :explanation, :text, null: false
  end
end
