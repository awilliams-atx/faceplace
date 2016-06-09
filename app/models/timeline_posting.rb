class TimelinePosting < ActiveRecord::Base
  validates :post_id, :author_id, :profile_owner_id, presence: true

  belongs_to :post

  belongs_to :poster,
    class_name: 'User'

  belongs_to :profile_owner,
    class_name: 'User',
    foreign_key: :profile_owner_id

  has_one :author,
    through: :post,
    source: :author
end
