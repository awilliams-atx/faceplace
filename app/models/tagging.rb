class Tagging < ActiveRecord::Base
  validates :tagged_id, :post_id, presence: true

  belongs_to :tagged,
    class_name: 'User',
    foreign_key: :tagged_id

  belongs_to :post

  has_one :notification, as: :notifiable
end
