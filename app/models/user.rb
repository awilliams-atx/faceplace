class User < ActiveRecord::Base
  validates :email, presence: { message: 'Email required' }
  validates :email, uniqueness: { message: 'Email already taken' }
  validates :first_name, presence: { message: 'First name required' }
  validates :last_name, presence: { message: 'Last name required' }
  validates :password,
    length: {
      minimum: 6,
      allow_nil: true,
      message: 'Password must be at least six characters long'
    }
  validates :session_token, presence: true

  # ---------------------------------PAPERCLIP-------------------------------- #

has_attached_file :profile_pic, default_url: "default_profile_pic.png"
validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  has_attached_file :cover_photo, styles: { cover: '851x315#' }, default_url: "default_:style_cover_photo.png"
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/

  # -------------------------------ASSOCIATIONS------------------------------ #

  has_many :posts,
    foreign_key: :author_id

  has_many :friendships, dependent: :destroy

  has_many :friends,
    class_name: 'User',
    through: :friendships,
    source: :friend

  has_many :received_friend_requests,
    class_name: 'FriendRequest',
    foreign_key: :receiver_id,
    dependent: :destroy

  has_many :made_friend_requests,
    class_name: 'FriendRequest',
    foreign_key: :maker_id,
    dependent: :destroy

  has_many :notifications,
    class_name: 'Notification',
    foreign_key: :notified_user_id,
    dependent: :destroy

  has_many :taggings,
    foreign_key: :tagged_id,
    dependent: :destroy

  has_many :tagged_posts,
    through: :taggings,
    source: :post

  has_many :timeline_postings,
    foreign_key: :profile_owner_id,
    dependent: :destroy

  has_many :received_timeline_posts,
    through: :timeline_postings,
    source: :post

  after_initialize :ensure_session_token

  # ----------------------------------METHODS--------------------------------- #

  attr_reader :password

  def friends_with?(id)
    Friendship.exists?(user_id: self.id, friend_id: id)
  end

  def has_pending_request_for?(id)
    FriendRequest.exists?(maker_id: self.id, receiver_id: id)
  end

  def has_pending_request_from?(id)
    FriendRequest.exists?(maker_id: id, receiver_id: self.id)
  end

  def most_recently_added
    @users = friends
      .order("friendships.created_at DESC")
      .limit(9)
  end

  def self.search(search_string, opts = {})
    if opts[:friends_only]
      opts[:user].friends
        .where('LOWER(first_name) LIKE :string
        OR LOWER(last_name) LIKE :string',
        {string: search_string.downcase + '%'})
        .limit(8)
    else
      User.all
        .where('LOWER(first_name) LIKE :string
        OR LOWER(last_name) LIKE :string',
        {string: search_string.downcase + '%'})
        .limit(8)
    end
  end

  def timeline_posts
    Post.all
      .joins('LEFT OUTER JOIN taggings ON taggings.post_id = posts.id')
      .joins('LEFT OUTER JOIN timeline_postings ON timeline_postings.post_id = posts.id')
      .where('posts.author_id = :user_id OR taggings.tagged_id = :user_id OR timeline_postings.profile_owner_id = :user_id', {user_id: self.id})
      .group('posts.id')
      .order('posts.updated_at DESC')
  end

  # -----------------------------QUALITY OF LIFE---------------------------- #

  def full_name
    "#{first_name} #{last_name}"
  end

  # -----------------------------AUTHENTICATION----------------------------- #

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(facebook_uid: auth_hash[:uid])

    if user.nil?
      first_name, last_name = auth_hash[:info][:name].split(' ')
      user = User.create!(
        facebook_uid: auth_hash[:uid],
        email: auth_hash[:info][:email],
        first_name: first_name,
        last_name: last_name,
        password: SecureRandom::urlsafe_base64(16)
      )
    end

    user
  end

  def self.find_by_credentials(params)
    user = User.find_by(email: params[:email])
    return nil if user.nil?
    user.correct_password?(params[:password]) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    save!
    session_token
  end

  def correct_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
