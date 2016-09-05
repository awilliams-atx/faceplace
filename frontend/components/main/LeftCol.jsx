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
      <td id='left-col'>
        <aside id='left-col-content'>
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
            <li className='left-col-title'>
              DEVELOPER
            </li>
            <li className='group'>
              <a href='/users/44' onClick={this.pushUserRoute}>
                <img src={this.devPic()} />
                <div className='left-col-text'>
                  Andrew Williams
                </div>
              </a>
            </li>
          </ul>
        </aside>
      </td>
    );
  },
  devPic: function () {
    return 'http://s3.amazonaws.com/faceplace-dev/users/profile_pics/000/000/783/original/andrew_williams_profile_pic.jpg?1473038182';
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
