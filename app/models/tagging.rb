class Tagging < ActiveRecord::Base
  validates :tagged_id, :post_id, presence: true

  after_create :add_watching, :make_notification
  after_destroy :remove_watching, :remove_notification

  belongs_to :post
  belongs_to :tagged, class_name: 'User'
  has_one :tagger, through: :post, source: :author

  private

  def add_watching
    Watching.find_or_create_by!(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: tagged_id)
  end

  def make_notification
    Notification.create!(notifiable_type: 'Tagging', notifiable_id: id,
      notifier_id: tagger.id, notified_id: tagged_id, notifier_name: tagger.full_name)
  end

  def remove_notification
    notification = Notification.find_by(notifiable_type: 'Tagging',
      notifiable_id: id, notified_id: tagged_id)
    notification.destroy if notification
  end

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: tagged_id)
    watching.destroy if watching
  end
end
