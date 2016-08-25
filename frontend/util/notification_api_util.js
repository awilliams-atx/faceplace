var ServerActions = require('../actions/server_actions');

var NotificationApiUtil = {
  fetchNotifications: function () {
    $.ajax({
      url: 'api/notifications',
      method: 'GET',
      dataType: 'json',
      success: function (notifications) {
        ServerActions.receiveNotifications(notifications);
      }
    });
  },
  markNotificationsChecked: function (checkedIds) {
    $.ajax({
      url: 'api/notifications/mark_checked',
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
