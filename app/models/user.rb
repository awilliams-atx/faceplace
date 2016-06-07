class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :profile_pic, styles:
    { search_result: '36x36#', post: '38x38#', notifications: '48x48#', thumb: '100x100#' },
    default_url: "/images/:style/missing.png"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  has_attached_file :cover_photo, styles: { cover: '851x315#' }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/

  has_many :posts

  has_many :friendships

  has_many :friends,
    class_name: "User",
    through: :friendships,
    source: :friend

  after_initialize :ensure_session_token
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

  def full_name
    "#{first_name} #{last_name}"
  end

  # -------------------------AUTHENTICATION---------------------------- #

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
