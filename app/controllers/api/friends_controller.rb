class Api::FriendsController < ApplicationController
  def index
    @friends = currentUser.friends.limit(9)
  end
end
