var React = require('react'),
    FriendIndex = require('./friends/FriendIndex'),
    IntroIndex = require('./intro/IntroIndex'),
    PostIndex = require('../../posts/PostIndex'),
    ClientActions = require('../../../actions/client_actions'),
    FriendApiUtil = require('../../../util/friend_api_util'),
    PostApiUtil = require('../../../util/post_api_util'),
    ProfileApiUtil = require('../../../util/profile_api_util'),
    FriendStore = require('../../../stores/friend'),
    PostStore = require('../../../stores/post'),
    ProfileStore = require('../../../stores/profile'),
    SessionStore = require('../../../stores/session');

    var Timeline = React.createClass({
      getInitialState: function () {
        var userId = parseInt(this.props.params.userId);
        return({
          profileFetched: ProfileStore.profileFetched(userId),
          friendsFetched: FriendStore.friendsFetched(userId)
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
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              {introContent}
              {friendsContent}
            </aside>
            <section className='timeline-main-content'>
              <PostIndex userId={userId}/>
            </section>
          </div>
        );
      },
      componentDidMount: function () {
        var userId = this.props.params.userId;

        this.profileListener =
          ProfileStore.addListener(this.onProfileStoreChange);
        ClientActions.fetchProfile(userId);

        this.friendListener =
          FriendStore.addListener(this.onFriendStoreChange);
        ClientActions.fetchMostRecentlyAddedFriends(userId);
      },
      componentWillUnmount: function () {
        this.profileListener.remove();
        this.friendListener.remove();
      },
       componentWillReceiveProps: function (newProps) {
         var newUserId = newProps.params.userId;

         FriendApiUtil.fetchMostRecentlyAddedFriends(newUserId);
         ProfileApiUtil.fetchProfile(newUserId);
         PostApiUtil.fetchProfilePosts(newUserId);
       },
       onPostStoreChange: function () {
         var userId = parseInt(this.props.params.userId);

         this.setState({posts: PostStore.all(userId)});
       },
      onProfileStoreChange: function () {
        var userId = parseInt(this.props.params.userId);

        this.setState({
          profileFetched: ProfileStore.profileFetched(userId)
        });
      },
      onFriendStoreChange: function () {
        var userId = parseInt(this.props.params.userId);

        this.setState({
          friendsFetched: FriendStore.friendsFetched(userId)
        });
      }
    });

module.exports = Timeline;
