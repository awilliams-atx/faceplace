class Api::NotificationsController < ApplicationController
  before_action :require_login

  def index
    @notifications =
      current_user.notifications.includes(:notifier).map do |notif|
      formatted = {}
      case notif.notifiable_type
      when 'Tagging'
        formatted = {}
        formatted[:profile_pic] = notif.notifier.profile_pic.url
        formatted[:message] = "#{notif.notifier.full_name} tagged you in a post."
        formatted
      when 'TimelinePosting'
        formatted = {}
        formatted[:profile_pic] = notif.notifier.profile_pic.url
        formatted[:message] = "#{notif.notifier.full_name} posted on your timeline."
        formatted
      end
    end
    render json: @notifications
  end

  def destroy
    Notification.find(params[:id]).destroy
  end
end
