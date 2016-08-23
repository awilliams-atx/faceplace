class Api::NotificationsController < ApplicationController
  before_action :require_login

  def index
    @notifications =
      current_user.notifications.includes(:notifying_user).map do |notif|
      formatted = {}
      case notif.notifiable_type
      when 'Tagging'
        formatted = {}
        formatted[:profile_pic] = notif.notifying_user.profile_pic.url
        formatted[:message] = "#{notif.notifying_user.full_name} tagged you in a post."
        formatted
      when 'TimelinePosting'
        formatted = {}
        formatted[:profile_pic] = notif.notifying_user.profile_pic.url
        formatted[:message] = "#{notif.notifying_user.full_name} posted on your timeline."
        formatted
      end
    end
    render json: @notifications
  end

  def destroy
    Notification.find(params[:id]).destroy
  end
end
