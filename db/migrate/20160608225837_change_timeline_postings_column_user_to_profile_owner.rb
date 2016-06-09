class ChangeTimelinePostingsColumnUserToProfileOwner < ActiveRecord::Migration
  def change
    rename_column :timeline_postings, :user_id, :profile_owner_id
  end
end
