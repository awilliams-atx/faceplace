var config = require('./config.js'),
    SessionStore = require('../stores/session');

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
