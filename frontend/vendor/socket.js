var config = require('./config.js'),
    SessionStore = require('../stores/session');

class Socket {
  constructor (channelName, channelId) {
    this.config = config.channels[channelName];
    this.pusher = new Pusher(config.pusherId, { encrypted: true });
    this.channelId = SessionStore.currentUser().id;
    this.subscribe(channelId);
  }

  // Only call #subscribe directly to change subscriptions

  subscribe () {
    if (this.isSubscribed) {
      this.unsubscribe();
    }
    this.channel = this.pusher.subscribe(this.channelName());
    this.bindEvents();
    this.isSubscribed = true;
  }

  // PRIVATE

  bindEvents () {
    var events = this.config.events;
    events.forEach(function (event) {
      var eventName = Object.keys(event)[0];
      this.channel.bind(eventName, event[eventName])
    }.bind(this));
  }

  channelName () {
    return this.config.channelRoot + this.channelId;
  }

  unsubscribe () {
    this.pusher.unsubscribe(this.channelName());
  }
}

module.exports = Socket;
