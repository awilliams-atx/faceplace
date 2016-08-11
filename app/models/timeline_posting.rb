class TimelinePosting < ActiveRecord::Base
  include Notifiable
  validates :post_id, :profile_owner_id, presence: true

  belongs_to :post

  belongs_to :profile_owner,
    class_name: 'User',
    foreign_key: :profile_owner_id

  has_one :author,
    through: :post,
    source: :author
end
