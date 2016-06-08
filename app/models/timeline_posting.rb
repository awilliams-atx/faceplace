class TimelinePosting < ActiveRecord::Base
  validates :post_id, :user_id, presence: true

  belongs_to :post

  belongs_to :profile_owner,
    class_name: 'User',
    foreign_key: :user_id

  has_one :author,
    through: :post,
    source: :author
end
