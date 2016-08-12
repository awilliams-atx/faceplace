var React = require('react'),
    NotificationStore = require('../../stores/notification.js'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session.js');

var Notifications = React.createClass({
  getInitialState: function () {
    return { notifications: [] };
  },
  render: function () {
    var dropDown = function () {
      if (this.props.dropToggles['notifications']) {
        return(
          <div>NOTIFICATIONS {this.state.notifications.length}</div>
        );
      }
    }.bind(this);
    return (
      <div className={this.className()}
        id='notifications-drop'
        onClick={this.toggleNavDrop}>
        <i className="fa fa-globe" aria-hidden="true"></i>
        {dropDown()}
      </div>
    );
  },
  componentDidMount: function () {
    this.notificationListener =
      NotificationStore.addListener(this.onNotificationStoreChange);
    this.pusherSubscribe();
  },
  componentWillUnmount: function () {
    this.notificationListener.remove();
    this.pusher.unsubscribe('notifications_' + SessionStore.currentUser().id);
  },
  componentWillReceiveProps: function (props) {
    this.setState({ dropped: props.dropped });
  },
  className: function () {
    if (this.props.dropToggles['notifications']) {
      return 'nav-drop-active';
    } else {
      return 'nav-drop-inactive';
    }
  },
  onNotificationStoreChange: function () {
    this.setState({ notifications: NotificationStore.all() });
  },
  pusherSubscribe: function () {
    this.pusher = new Pusher('3d702a0663f5bd8c69dd', {
      encrypted: true
    });
    var channel = this.pusher.subscribe('notifications_' + SessionStore.currentUser().id);
    channel.bind('notification_received', ClientActions.fetchNotifications);
  },
  toggleNavDrop: function () {
    this.props.toggleNavDrop('notifications');
    var body = document.getElementsByTagName('body')[0];
    this.navDropClickListener = function (e) {
      var notificationsDrop = document.getElementById('notifications-drop');
      if (!notificationsDrop.contains(e.target)) {
        this.props.toggleNavDrop('null');
        body.removeEventListener('click', this.navDropClickListener);
      }
    }.bind(this);
    body.addEventListener('click', this.navDropClickListener);
  }
});

module.exports = Notifications;
