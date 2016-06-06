var React = require('react'),
    FriendApiUtil = require('../../../util/friend_api_util'),
    ProfileApiUtil = require('../../../util/profile_api_util'),
    IntroIndex = require('./intro/IntroIndex'),
    ProfileActions = require('../../../actions/profile_actions'),
    SessionActions = require('../../../actions/session_actions'),
    FriendIndex = require('./friends/FriendIndex'),
    ProfileStore = require('../../../stores/profile'),
    FriendStore = require('../../../stores/friend'),
    ClientActions = require('../../../actions/client_actions');

    var Timeline = React.createClass({
      getInitialState: function () {
        return({
          profileFetched:
            ProfileStore.profileFetched(parseInt(this.props.params.userId)),
          friendsFetched:
            FriendStore.friendsFetched(parseInt(this.props.params.userId))
        });
      },
      render: function () {
        var userId = parseInt(this.props.params.userId);

        var timelineContent,
            introContent,
            friendsContent;

        var authorizedToEdit =
          userId === SessionStore.currentUser().id;

        if (this.state.profileFetched) {
          introContent = (
                <IntroIndex userId={userId}
                  authorizedToEdit={authorizedToEdit} />
          );
        } else {
          // spinner
          introContent = <div className='empty-intro-content' />;
        }

        if (this.state.friendsFetched) {
          friendsContent = (
            <FriendIndex profileOwnerId={parseInt(this.props.params.userId)}/>
          );
        } else {
          friendsContent = <div className='empty-friends-content' />;
        }

        return (
          <div className='timeline-content'>
            <aside className='timeline-sidebar'>
              {introContent}
              {friendsContent}
            </aside>
          </div>
        );
      },
      componentDidMount: function () {
        this.profileListener =
          ProfileStore.addListener(this.onProfileStoreChange);
        ClientActions.fetchProfile(this.props.params.userId);

        this.friendListener =
          FriendStore.addListener(this.onFriendStoreChange);
        ClientActions.fetchMostRecentlyAddedFriends(this.props.params.userId);
      },
      componentWillUnmount: function () {
        this.profileListener.remove();
        this.friendListener.remove();
      },
       componentWillReceiveProps: function (newProps) {
         FriendApiUtil.fetchFriends(newProps.params.userId);
         ProfileApiUtil.fetchProfile(newProps.params.userId);
       },
      onProfileStoreChange: function () {
        this.setState({
          profileFetched:
            ProfileStore.profileFetched(parseInt(this.props.params.userId))
        });
      },
      onFriendStoreChange: function () {
        this.setState({
          friendsFetched:
            FriendStore.friendsFetched(parseInt(this.props.params.userId))
        });
      }
    });

module.exports = Timeline;
