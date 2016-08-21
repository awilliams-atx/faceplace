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
    SessionStore = require('../../../stores/session'),
    UserStore = require('../../../stores/user');

    var Timeline = React.createClass({
      getInitialState: function () {
        this.profileOwnerId = function () {
          return parseInt(this.props.params.userId) || SessionStore.currentUser().id
        }.bind(this)
        var profileOwnerId = this.profileOwnerId();
        return({
          profileFetched: UserStore.profileFetched(profileOwnerId),
          friendsFetched: FriendStore.friendsFetched(profileOwnerId)
        });
      },
      render: function () {
        var profileOwnerId = this.profileOwnerId();

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

        return (
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              {introContent}
              <FriendIndex profileOwnerId={profileOwnerId} />
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
          UserStore.addListener(this.onUserStoreChange);
        ClientActions.fetchProfile(profileOwnerId);

        this.friendListener =
          FriendStore.addListener(this.onFriendStoreChange);
        ClientActions.fetchMostRecentlyAddedFriends(profileOwnerId);
      },
      componentWillUnmount: function () {
        this.profileOwnerId = function () {
          return this.props.params.userId || SessionStore.currentUser().id
        }
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
         var profileOwnerId = this.profileOwnerId();

         this.setState({posts: PostStore.all(profileOwnerId)});
       },
      onUserStoreChange: function () {
        var profileOwnerId = this.profileOwnerId();

        this.setState({
          profileFetched: UserStore.profileFetched(profileOwnerId)
        });
      },
      onFriendStoreChange: function () {
        var profileOwnerId = this.profileOwnerId();

        this.setState({
          friendsFetched: FriendStore.friendsFetched(profileOwnerId)
        });
      }
    });

module.exports = Timeline;
