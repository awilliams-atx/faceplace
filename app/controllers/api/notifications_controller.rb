class Api::NotificationsController < ApplicationController
  before_action :require_login

  def destroy
    Notification.find(params[:id]).destroy
  end

  def mark_checked
    ids = JSON.parse(params[:checked_ids])
    ids.each do |id|
      notification = Notification.find_by(id: id)
      notification.update(checked: true) if notification
    end
    render json: ids
  end

  def mark_read
    notification = Notification.update(params[:id], read: true)
    render json: notification.id
  end

  def page
    @notifications = current_user.notifications.order(created_at: :desc)
      .limit(5).offset(params[:offset])
    render 'api/notifications/index'
  end
end
