class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable

  belongs_to :author,
    class_name: 'User'
end
