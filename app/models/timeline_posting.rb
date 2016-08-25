class TimelinePosting < ActiveRecord::Base
  validates :post_id, :profile_owner_id, presence: true

  after_create :add_watching, :make_notification
  after_destroy :remove_watching

  has_one :author, through: :post, source: :author
  belongs_to :post
  belongs_to :profile_owner, class_name: 'User', foreign_key: :profile_owner_id

  private

  def add_watching
    Watching.find_or_create_by!(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: profile_owner_id)
  end

  def make_notification
    Notification.create!(notifiable_type: 'Post', notifiable_id: post_id,
      notifier_id: author.id, notified_id: profile_owner.id)
  end

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: profile_owner_id)
    watching.destroy if watching
  end
end
