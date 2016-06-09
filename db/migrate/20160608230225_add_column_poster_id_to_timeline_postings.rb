class AddColumnPosterIdToTimelinePostings < ActiveRecord::Migration
  def change
    add_column :timeline_postings, :poster_id, :integer, null: false
  end
end
