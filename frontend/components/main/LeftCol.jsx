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
          <li>
            <a href={'/users/' + SessionStore.currentUser().id}
              onClick={this.pushUserRoute}>
              {this.fullName()}
            </a>
          </li>
        </ul>
      </aside>
    );
  },
  fullName: function () {
    if (Object.keys(this.state.user).length > 0) {
      return this.state.user.first_name + ' ' + this.state.user.last_name;
    } else {
      return '';
    }
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
