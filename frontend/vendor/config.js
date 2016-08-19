var ServerActions = require('../actions/server_actions');

module.exports = {
  pusherId: '3d702a0663f5bd8c69dd',
  channels: {
    friendships: {
      channelRoot: 'friendships_',
      events: [
        { friended: ServerActions.receiveAcceptedMadeFriendRequest }
      ]
    },
    friend_requests: {
      channelRoot: 'friend_requests_',
      events: [
        { received: ServerActions.receiveReceivedFriendRequest }
      ]
    }
  }
};
