class Api::NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications
  end

  def destroy
    Notification.find(params[:id]).destroy
  end
end
