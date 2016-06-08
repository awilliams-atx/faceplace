class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend,
    class_name: "User"

  # --------------------------------DEBUGGING------------------------------- #

  def inspect
    "User ID: #{user_id}, Friend ID: #{friend_id}\n"
  end

end
