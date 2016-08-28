var React = require('react'),
    Moment = require('moment'),
    ClientActions = require('../../actions/client_actions');

var NotificationItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <a href={'#' + this.props.notif.post_id}
        onClick={this.checkNotification}
        className={'nav-drop-item ' + this.readClass()}>
        <div className='group'>
          <img src={this.props.notif.profile_pic_url}
            className='nav-drop-profile-pic nav-drop-block' />
          <div className='notification-details nav-drop-block'>
            <div>
              <div className='notification-explanation'>
                <span className='notifier-name'>
                  {this.props.notif.notifier_name}
                </span>
                &nbsp;{this.props.notif.explanation}
              </div>
              <div className='notification-footer'>
                <i className="fa fa-comment" aria-hidden="true"></i>
                <span className='notification-date'>{this.renderDate()}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  },
  checkNotification: function (e) {
    if (!this.props.notif.read) {
      ClientActions.markNotificationRead(this.props.notif.id);
    }
    this.pushPostRoute(e);
  },
  pushPostRoute: function (e) {
    var pushPath = '/users/' + this.props.notif.timeline_owner_id;
    if (window.location.pathname !== pushPath) {
      e.preventDefault();
      this.context.router.push({
        pathname: pushPath,
        query: { post_id: this.props.notif.post_id }
      });
    } else if (window.location.hash === '#' + this.props.notif.post_id) {
      window.location.hash = '';
      window.location.hash = this.props.notif.post_id;
    }
    this.props.rollUp();
  },
  readClass: function (id) {
    return this.props.notif.read ? '' : 'unchecked-alert';
  },
  renderDate: function () {
    var currentTime = new Date();
    var notifTime = this.props.notif.created_at;
    if (currentTime - new Date(notifTime) < 86400000) {
      return Moment(notifTime).fromNow();
    } else {
      return Moment(notifTime).format("dddd, MMMM Do YYYY, h:mm a");
    }
  }
});

module.exports = NotificationItem;
