class Api::NotificationsController < ApplicationController
  before_action :require_login

  def index
    @notifications = current_user.notifications
    render 'api/notifications/index'
  end

  def destroy
    Notification.find(params[:id]).destroy
  end

  def mark_checked
    ids = JSON.parse(params[:checked_ids])
    ids.each do |id|
      Notification.find(id).update(checked: true)
    end

    render json: ids
  end
end
