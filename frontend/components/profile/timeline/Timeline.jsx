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
        var profileOwnerId = parseInt(this.props.params.userId);
        return({
          profileFetched: ProfileStore.profileFetched(profileOwnerId),
          friendsFetched: FriendStore.friendsFetched(profileOwnerId)
        });
      },
      render: function () {
        var profileOwnerId = parseInt(this.props.params.userId);

        var timelineContent,
            introContent,
            friendsContent;

        var authorizedToEdit =
          profileOwnerId === SessionStore.currentUser().id;
        
        if (this.state.profileFetched) {
          introContent = (
                <IntroIndex userId={profileOwnerId}
                  authorizedToEdit={authorizedToEdit} />
          );
        } else {
          // spinner
          introContent = <div className='empty-intro-content' />;
        }

        if (this.state.friendsFetched) {
          friendsContent = (
            <FriendIndex profileOwnerId={profileOwnerId}/>
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
              <PostIndex profileOwnerId={profileOwnerId}/>
            </section>
          </div>
        );
      },
      componentDidMount: function () {
        var profileOwnerId = this.props.params.userId;

        this.profileListener =
          ProfileStore.addListener(this.onProfileStoreChange);
        ClientActions.fetchProfile(profileOwnerId);

        this.friendListener =
          FriendStore.addListener(this.onFriendStoreChange);
        ClientActions.fetchMostRecentlyAddedFriends(profileOwnerId);
      },
      componentWillUnmount: function () {
        this.profileListener.remove();
        this.friendListener.remove();
      },
       componentWillReceiveProps: function (newProps) {
         var newProfileOwnerId = newProps.params.userId;

         FriendApiUtil.fetchMostRecentlyAddedFriends(newProfileOwnerId);
         ProfileApiUtil.fetchProfile(newProfileOwnerId);
         PostApiUtil.fetchTimelinePosts(newProfileOwnerId);
       },
       onPostStoreChange: function () {
         var profileOwnerId = parseInt(this.props.params.userId);

         this.setState({posts: PostStore.all(profileOwnerId)});
       },
      onProfileStoreChange: function () {
        var profileOwnerId = parseInt(this.props.params.userId);

        this.setState({
          profileFetched: ProfileStore.profileFetched(profileOwnerId)
        });
      },
      onFriendStoreChange: function () {
        var profileOwnerId = parseInt(this.props.params.userId);

        this.setState({
          friendsFetched: FriendStore.friendsFetched(profileOwnerId)
        });
      }
    });

module.exports = Timeline;
