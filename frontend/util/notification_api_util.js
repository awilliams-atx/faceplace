var ServerActions = require('../actions/server_actions');

var NotificationApiUtil = {
  fetchNotifications: function () {
    $.ajax({
      url: 'api/notifications',
      method: 'GET',
      dataType: 'json',
      success: function (notifications) {
        console.log('NotificationApiUtil#fetchNotifications');
        ServerActions.receiveNotifications(notifications);
      }
    });
  }
};

module.exports = NotificationApiUtil;
