var React = require('react'),
    ClientActions = require('../../../actions/client_actions'),
    FriendApiUtil = require('../../../util/friend_api_util'),
    ProfileApiUtil = require('../../../util/profile_api_util'),
    FriendStore = require('../../../stores/friend'),
    ProfileStore = require('../../../stores/profile'),
    FriendIndex = require('./friends/FriendIndex'),
    IntroIndex = require('./intro/IntroIndex'),
    PostIndex = require('../../posts/PostIndex');

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
            friendsContent,
            postsContent;

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
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              {introContent}
              {friendsContent}
            </aside>
            <section className='timeline-main-content'>
              <PostIndex />
            </section>
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
         FriendApiUtil.fetchMostRecentlyAddedFriends(newProps.params.userId);
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
