var React = require('react'),
    QC = require('../../util/query_code'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
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
                <span className='notification-date'>
                  {Util.moment(this.props.notif.created_at)}
                </span>
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
    e.preventDefault();
    this.props.rollUp();
    var pushPath = '/users/' + this.props.notif.timeline_owner_id;
    UI.set('scrollPost', this.props.notif.post_id);
    if (Util.pathMatch('/users/' + this.props.notif.timeline_owner_id)) {
      UI.scrollToPost();
    }
    this.context.router.push(pushPath);
  },
  readClass: function (id) {
    return this.props.notif.read ? '' : 'unchecked-alert';
  }
});

module.exports = NotificationItem;
