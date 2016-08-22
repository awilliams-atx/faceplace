var React = require('react'),
    FriendIndex = require('./friends/FriendIndex'),
    IntroIndex = require('./intro/IntroIndex'),
    PostIndex = require('../../posts/PostIndex'),
    ClientActions = require('../../../actions/client_actions'),
    FriendStore = require('../../../stores/friend'),
    PostStore = require('../../../stores/post'),
    SessionStore = require('../../../stores/session'),
    UserStore = require('../../../stores/user');

    var Timeline = React.createClass({
      render: function () {
        return (
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              <IntroIndex userId={this.profileOwnerId()}
                authorizedToEdit={this.authorizedToEdit()} />
              <FriendIndex user_id={this.profileOwnerId()} />
            </aside>
            <section className='timeline-main-content'>
              <PostIndex profileOwnerId={this.profileOwnerId()} />
            </section>
          </div>
        );
      },
      componentDidMount: function () {
        ClientActions.fetchMostRecentlyAddedFriends(this.props.params.userId);
        ClientActions.fetchTimelinePosts(this.props.params.userId);
      },
      componentWillReceiveProps: function (props) {
        ClientActions.fetchMostRecentlyAddedFriends(props.params.userId);
        ClientActions.fetchTimelinePosts(props.params.userId);
      },
      authorizedToEdit: function () {
        return this.profileOwnerId() === SessionStore.currentUser().id;
      },
      profileOwnerId: function () {
        return parseInt(this.props.params.userId) || SessionStore.currentUser().id
      }
    });

module.exports = Timeline;
