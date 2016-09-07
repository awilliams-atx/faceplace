class Post < ActiveRecord::Base
  attr_accessor :profile_owner_id, :tagged_ids, :uploaded_images, :add_tags, :remove_tags

  validates :author_id, presence: true

  after_create :add_watching, :create_images, :create_taggings, :create_timeline_posting
  after_update :update_tags
  after_destroy :destroy_notifications

  belongs_to :author, class_name: 'User', foreign_key: :author_id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :commenters, through: :comments, class_name: 'User', foreign_key:
    :author_id, source: :author
  has_many :images, as: :imageable, dependent: :destroy
  has_one :profile_owner, through: :timeline_posting
  has_many :tagged_friends, through: :taggings, source: :tagged
  has_many :taggings, dependent: :destroy
  has_one :timeline_posting, dependent: :destroy
  has_many :watchers, through: :watchings
  has_many :watchings, as: :watchable, dependent: :destroy

  def timeline_owner_id
    timeline_posting ? timeline_posting.profile_owner_id : author.id
  end

  private

  def add_watching
    Watching.create!(watchable_type: 'Post', watchable_id: id, watcher_id:
      author_id)
  end

  def create_images
    return unless uploaded_images
    uploaded_images.each do |img|
      Image.create!(image: img, imageable_id: id, imageable_type: 'Post')
    end
  end

  def create_taggings
    return unless tagged_ids
    tagged_ids.split(',').each do |uid|
      Tagging.create!(tagged_id: uid, post_id: id)
    end
  end

  def create_timeline_posting
    return unless profile_owner_id
    TimelinePosting.create!(profile_owner_id: profile_owner_id, post_id: id)
  end

  def destroy_notifications
    Notification.where(post_id: id).destroy_all
  end

  def update_tags
    add_tags.split(',').each do |tagged_id|
      Tagging.create!(post_id: id, tagged_id: tagged_id)
    end
    remove_tags.split(',').each do |tagged_id|
      tagging = Tagging.find_by(tagged_id: tagged_id, post_id: id)
      tagging.destroy if tagging
    end
  end
end
