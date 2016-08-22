var React = require('react'),
    FriendIndex = require('./friends/FriendIndex'),
    IntroIndex = require('./intro/IntroIndex'),
    PostIndex = require('../../posts/PostIndex'),
    ClientActions = require('../../../actions/client_actions'),
    FriendApiUtil = require('../../../util/friend_api_util'),
    PostApiUtil = require('../../../util/post_api_util'),
    FriendStore = require('../../../stores/friend'),
    PostStore = require('../../../stores/post'),
    SessionStore = require('../../../stores/session'),
    UserStore = require('../../../stores/user');

    var Timeline = React.createClass({
      getInitialState: function () {
        return({
          profileFetched: UserStore.profileFetched(this.profileOwnerId()),
          friendsFetched: FriendStore.friendsFetched(this.profileOwnerId())
        });
      },
      render: function () {
        var timelineContent,
            introContent,
            friendsContent;

        var authorizedToEdit =
          this.profileOwnerId() === SessionStore.currentUser().id;

        var renderIntro = function () {
          if (this.state.profileFetched) {
            return <IntroIndex userId={this.profileOwnerId()}
              authorizedToEdit={authorizedToEdit} />;
          }
        }.bind(this);

        return (
          <div className='timeline-content group'>
            <aside className='timeline-sidebar'>
              {renderIntro()}
              <FriendIndex profileOwnerId={this.profileOwnerId()} />
            </aside>
            <section className='timeline-main-content'>
              <PostIndex profileOwnerId={this.profileOwnerId()} />
            </section>
          </div>
        );
      },
      componentDidMount: function () {
        this.profileListener = UserStore.addListener(this.onUserStoreChange);
        this.friendListener = FriendStore.addListener(this.onFriendStoreChange);
        ClientActions.fetchMostRecentlyAddedFriends(this.props.params.userId);
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
        PostApiUtil.fetchTimelinePosts(newProfileOwnerId);
      },
      onPostStoreChange: function () {
        this.setState({ posts: PostStore.all(this.profileOwnerId()) });
      },
      onUserStoreChange: function () {
        this.setState({
          profileFetched: UserStore.profileFetched(this.profileOwnerId())
        });
      },
      onFriendStoreChange: function () {
        var profileOwnerId = this.profileOwnerId();
        this.setState({
          friendsFetched: FriendStore.friendsFetched(profileOwnerId)
        });
      },
      profileOwnerId: function () {
        return parseInt(this.props.params.userId) || SessionStore.currentUser().id
      }
    });

module.exports = Timeline;
