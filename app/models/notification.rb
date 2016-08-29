class Notification < ActiveRecord::Base
  validates :notifiable_id, :notifiable_type, :notified_id, :notifier_id, :timeline_owner_id, :explanation, presence: true

  before_validation :add_explanation, :add_timeline_owner_id, :add_post_id, on:
    :create

  belongs_to :notifiable, polymorphic: true
  belongs_to :notified, class_name: 'User'
  belongs_to :notifier, class_name: 'User'

  private

  def add_explanation
    self.explanation = make_explanation
  end

  def add_post_id
    self.post_id = get_post_id
  end

  def add_timeline_owner_id
    self.timeline_owner_id = get_timeline_owner_id
  end

  def get_post_id
    case notifiable_type
    when 'Comment'
      notifiable.commentable_id
    when 'Tagging'
      notifiable.post_id
    when 'TimelinePosting'
      notifiable.post_id
    end
  end

  def make_explanation
    case notifiable_type
    when 'Comment'
      @post = notifiable.commentable
      if notifying_post_author?
        "commented on your post."
      elsif notifying_profile_owner?
        "commented on a post on your timeline."
      elsif notifying_tagged_user?
        "commented on a post you're tagged in."
      elsif notifying_commenter?
        "commented on a post you commented on."
      end
    when 'Tagging'
      "tagged you in a post."
    when 'TimelinePosting'
      "posted on your timeline."
    end
  end

  def notifying_commenter?
    @post.comments.pluck(:author_id).include?(notified.id)
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

  def get_timeline_owner_id
    case notifiable_type
    when 'Comment'
      notifiable.commentable.timeline_owner_id
    when 'Tagging'
      notifiable.post.timeline_owner_id
    when 'TimelinePosting'
      notifiable.profile_owner_id
    end
  end
end
