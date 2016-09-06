var ServerActions = require('../actions/server_actions');

var NotificationApiUtil = {
  fetchNotifications: function (offset) {
    $.ajax({
      url: '/api/notifications/',
      method: 'GET',
      dataType: 'json',
      data: { offset: offset },
      success: function (notifications) {
        ServerActions.receiveNotifications(notifications);
      }
    });
  },
  markNotificationRead: function (id) {
    $.ajax({
      url: '/api/notifications/' + id + '/mark_read',
      method: 'POST',
      dataType: 'json',
      success: function (id) {
        ServerActions.receiveReadNotificationId(id);
      }
    })
  },
  markNotificationsChecked: function (checkedIds) {
    $.ajax({
      url: '/api/notifications/mark_checked',
      method: 'POST',
      dataType: 'json',
      data: { checked_ids : JSON.stringify(checkedIds) },
      success: function (checked_ids) {
        ServerActions.receiveCheckedNotificationIds(checked_ids);
      }
    })
  },
};

module.exports = NotificationApiUtil;
