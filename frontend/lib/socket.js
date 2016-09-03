var SocketActions = require('../actions/socket_actions'),
    SessionStore = require('../stores/session');

var config = {
  channels: {
    friend_requests: {
      channelRoot: 'friend_requests_',
      events: [{ received: SocketActions.pushFriendRequest }]
    },
    notifications: {
      channelRoot: 'notifications_',
      events: [{ received: SocketActions.pushNotification }]
    }
  },
  pusherId: '3d702a0663f5bd8c69dd'
};

function Socket (channelName, channelId) {
  this.config = config.channels[channelName];
  this.pusher = new Pusher(config.pusherId, { encrypted: true });
  this.channelId = SessionStore.currentUser().id;
  this.subscribe(channelId);
}

Socket.prototype.subscribe = function () {
  if (this.isSubscribed) {
    this.unsubscribe();
  }
  this.channel = this.pusher.subscribe(this.channelName());
  this.bindEvents();
  this.isSubscribed = true;
};

Socket.prototype.bindEvents = function () {
  var events = this.config.events;
  events.forEach(function (event) {
    var eventName = Object.keys(event)[0];
    this.channel.bind(eventName, event[eventName])
  }.bind(this));
};

Socket.prototype.channelName = function () {
  return this.config.channelRoot + this.channelId;
};

Socket.prototype.unsubscribe = function () {
  this.pusher.unsubscribe(this.channelName());
};

module.exports = Socket;
