class RemoveAuthorIdFromTimelinePostings < ActiveRecord::Migration
  def change
    remove_column :timeline_postings, :author_id
  end
end
