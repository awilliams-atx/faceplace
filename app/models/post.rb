class Post < ActiveRecord::Base
  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  has_many :taggings

  has_many :tagged_friends,
    through: :taggings,
    source: :tagged

  has_one :timeline_posting
end
