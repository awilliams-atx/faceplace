class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, presence: true

  after_create :add_watching
  after_destroy :remove_watching

  belongs_to :author, class_name: 'User'
  belongs_to :commentable, polymorphic: true

  private

  def add_watching
    Watching.find_or_create_by(watchable_type: 'Post', watchable_id:
      commentable_id, watcher_id: author_id)
  end

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id:
      commentable_id, watcher_id: author_id)
    watching.destroy if watching
  end
end
