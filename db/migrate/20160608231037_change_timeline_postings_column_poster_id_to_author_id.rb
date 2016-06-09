class ChangeTimelinePostingsColumnPosterIdToAuthorId < ActiveRecord::Migration
  def change
    rename_column :timeline_postings, :poster_id, :author_id
  end
end
