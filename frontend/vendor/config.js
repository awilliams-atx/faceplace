var SocketActions = require('../actions/socket_actions');

module.exports = {
  pusherId: '3d702a0663f5bd8c69dd',
  channels: {
    friend_requests: {
      channelRoot: 'friend_requests_',
      events: [
        { received: SocketActions.pushFriendRequest }
      ]
    },
    notifications: {
      channelRoot: 'notifications_',
      events: [
        { received: SocketActions.pushNotification }
      ]
    }
  }
};
