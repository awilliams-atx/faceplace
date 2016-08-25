class Notification < ActiveRecord::Base
  validates :notifiable_id, :notifiable_type, :notified_id, :notifier_id, presence: true

  before_create :add_explanation

  belongs_to :notifiable, polymorphic: true
  belongs_to :notified, class_name: 'User'
  belongs_to :notifier, class_name: 'User'

  private

  def add_explanation
    self.explanation = make_explanation
  end

  def make_explanation
    case notifiable_type
    when 'Comment'
      post = notifiable.commentable
      if post.author == notified
        "#{notifier.full_name} commented on your post."
      elsif post.timeline_posting && post.timeline_posting.profile_owner ==
        notified
        "#{notifier.full_name} commented on a post on your timeline."
      elsif post.taggings.pluck(:tagged_id).include?(notified.id)
        "#{notifier.full_name} commented on a post you're tagged in."
      end
    when 'Tagging'
      "#{notifier.full_name} tagged you in a post."
    when 'TimelinePosting'
      "#{notifier.full_name} posted on your timeline."
    end
  end
end
