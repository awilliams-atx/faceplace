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
        console.log('Timeline#render');
        return (
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              <IntroIndex userId={this.profileOwnerId()}
                authorizedToEdit={this.authorizedToEdit()} />
              <FriendIndex profileOwnerId={this.profileOwnerId()} />
            </aside>
            <section className='timeline-main-content'>
              <PostIndex profileOwnerId={this.profileOwnerId()} />
            </section>
          </div>
        );
      },
      componentWillUnmount: function () {
        this.profileOwnerId = function () {
          return this.props.params.userId || SessionStore.currentUser().id
        }
      },
      componentWillReceiveProps: function (props) {
        console.log('Timeline#componentWillReceiveProps');
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
