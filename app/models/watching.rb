class Watching < ActiveRecord::Base
  validates :watchable_id, :watchable_type, :watcher_id, presence: true
  validates :watcher_id, uniqueness: { scope: :watchable_id, message: 'Watcher
    already watching watchable' }
  belongs_to :watcher, class_name: 'User'
  belongs_to :watchable, polymorphic: true
end
