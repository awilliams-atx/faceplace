class Api::NotificationsController < ApplicationController
  before_action :require_login

  def index
    @notifications = current_user.notifications
    render 'api/notifications/index'
  end

  def destroy
    Notification.find(params[:id]).destroy
  end
end
