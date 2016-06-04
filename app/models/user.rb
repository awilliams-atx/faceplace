class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :profile_pic, styles: { search_result: '36x36#' }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token
  attr_reader :password

  def friends
    current_user_id = self.id
    # User.find_by_sql([<<-SQL, {id: current_user_id}])
    #   SELECT id
    #   FROM friendings
    #   WHERE lady_id = :id OR gentleman_id = :id
    # SQL

    Friending
      .select(:id)
      .where("lady_id = :id OR gentleman_id = :id", {id: current_user_id})
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
