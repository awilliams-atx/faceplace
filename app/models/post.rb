class Post < ActiveRecord::Base
  validates :author_id, presence: true

  after_create :add_watching

  belongs_to :author, class_name: 'User', foreign_key: :author_id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :commenters, through: :comments, class_name: 'User', foreign_key:
    :author_id, source: :author
  has_one :profile_owner, through: :timeline_posting, source: :profile_owner
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

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id: id,
      watcher_id: author_id)
    watching.destroy if watching
  end
end
