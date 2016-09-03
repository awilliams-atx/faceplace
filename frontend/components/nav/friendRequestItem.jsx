var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general');

var FriendRequestItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className={this.className() + 'nav-drop-item group'}>
        <img src={this.props.req.profile_pic_url}
          className='nav-drop-profile-pic nav-drop-block' />
        <div className='friend-request-details nav-drop-block'>
          <a href={'/users/' + this.props.req.maker_id}
            onClick={this.pushUserRoute}>
            {this.props.req.name}
          </a>
          <aside>a million friends</aside>
        </div>
        {this.renderButtons()}
      </div>
    );
  },
  renderButtons: function () {
    if (this.requestType() === 'pending') {
      return (
        <div className='friend-request-response'>
          <button className='button-blue' onClick={this.onAccept}>
            Confirm
          </button>
          <button className='button-gray' onClick={this.onReject}>
            Delete Request
          </button>
        </div>
      );
    } else {
      return (
        <div className='friend-request-response'>
          <button className='button-gray-inactive'>
            Friends&nbsp;
            <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        </div>
      );
    }
  },
  className: function () {
    if (this.props.req.acceptance_checked) {
      return '';
    } else if (!this.props.req.checked) {
      return 'unchecked-alert ';
    } else if (this.props.req.accepted && !this.props.req.acceptance_checked) {
      return 'just-accepted ';
    } else {
      return '';
    }
  },
  onAccept: function (e) {
    e.preventDefault();
    this.props.req.accepted = true;
    this.props.req.acceptance_checked = false;
    this.props.req.checked = true;
    this.props.onAccept(this.props.req.maker_id);
    UI.addListener(this.onUIChange);
  },
  onReject: function (e) {
    e.preventDefault();
    this.props.onReject(this.props.req.maker_id);
  },
  onUIChange: function () {
    if (!UI.requestsDropped()) {
      this.props.req.acceptance_checked = true;
      UI.removeListener(this.onUIChange);
    }
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    this.props.rollUp();
    this.context.router.push(e.target.pathname);
    Util.jumpToTop();
  },
  requestType: function () {
    if (this.props.onAccept) {
      return 'pending';
    } else {
      return 'accepted';
    }
  }
});

module.exports = FriendRequestItem;
