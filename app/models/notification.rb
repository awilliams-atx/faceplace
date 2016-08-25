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
      @post = notifiable.commentable
      if notifying_post_author?
        "#{notifier.full_name} commented on your post."
      elsif notifying_profile_owner?
        "#{notifier.full_name} commented on a post on your timeline."
      elsif notifying_tagged_user?
        "#{notifier.full_name} commented on a post you're tagged in."
      end
    when 'Tagging'
      "#{notifier.full_name} tagged you in a post."
    when 'TimelinePosting'
      "#{notifier.full_name} posted on your timeline."
    end
  end

  def notifying_post_author?
    @post.author == notified
  end

  def notifying_profile_owner?
    @post.timeline_posting && @post.timeline_posting.profile_owner ==
      notified
  end

  def notifying_tagged_user?
    @post.taggings.pluck(:tagged_id).include?(notified.id)
  end
end
