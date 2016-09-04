var React = require('react'),
    Util = require('../../util/general');

var LeftCol = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { user: SessionStore.currentUser() }
  },
  render: function () {
    return (
      <aside id='left-col'>
        <ul>
          <li className='group'>
            <a href={'/users/' + SessionStore.currentUser().id}
              onClick={this.pushUserRoute}>
              <img src={this.state.user.profile_pic_url} />
              <div className='left-col-text'>
                {SessionStore.fullName()}
              </div>
            </a>
          </li>
        </ul>
      </aside>
    );
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    var anchor = Util.findSelfOrParent(e.target, 'A');
    this.context.router.push(anchor.pathname);
  },
  onSessionStoreChange: function () {
    this.setState({ user: SessionStore.currentUser() });
  }
});

module.exports = LeftCol;
