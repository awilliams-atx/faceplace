class Api::NotificationsController < ApplicationController
  before_action :require_login

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

  def mark_read
    notification = Notification.find(params[:id]).update(read: true)
    render json: notification.id
  end

  def page
    @notifications = current_user.notifications.order(created_at: :desc)
      .limit(5).offset(calculate_offset(5))
    render 'api/notifications/index'
  end

  private

  def calculate_offset(per_page)
    (params[:page].to_i - 1) * per_page + params[:offset].to_i
  end
end
