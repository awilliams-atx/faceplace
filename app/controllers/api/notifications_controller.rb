class Api::NotificationsController < ApplicationController
  def index
    all_notifications = extract_notifications
    @notifications = all_notifications[:notifications]
    @friend_requests = all_notifications[:friend_requests]
    render 'api/notifications/index'
  end

  def destroy
    Notification.find(params[:id]).destroy
  end

  private

  def extract_notifications
    @notifications = Hash.new { |h, k| h[k] = [] }
    current_user.notifications
      .includes(:notifying_user).each do |notification|
      case notification.notifiable_type
      when 'TimelinePosting'
        @notifications[:notifications] <<
          format_timeline_posting(notification)
      when 'Tagging'
        @notifications[:notifications] << format_tagging(notification)
      when 'FriendRequest'
        @notifications[:friend_requests] << format_friend_request(notification)
      end
    end
    @notifications
  end

  def format_friend_request(notif)
    formatted = {}
    formatted[:name] = notif.notifying_user.full_name
  end

  def format_tagging(notif)
    formatted = {}
    formatted[:message] = "#{notif.notifying_user.full_name} tagged you in a post."
  end

  def format_timeline_posting(notif)
    formatted = {}
    formatted[:message] = "#{notif.notifying_user.full_name} posted on your timeline."
  end
end
