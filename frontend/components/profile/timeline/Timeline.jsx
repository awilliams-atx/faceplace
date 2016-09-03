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
          <div id='timeline-content group'>
            <aside id='timeline-sidebar'>
              <IntroIndex userId={this.profileOwnerId()}
                authorizedToEdit={this.authorizedToEdit()} />
              <FriendIndex user_id={this.profileOwnerId()} />
            </aside>
            <section id='timeline-main-content'
              className='timeline-main-content-anchored'>
              <PostIndex profileOwnerId={this.profileOwnerId()} />
            </section>
          </div>
        );
      },
      componentDidMount: function () {
        ClientActions.fetchMostRecentlyAddedFriends(this.props.params.userId);
        ClientActions.fetchPosts(this.props.params.userId);
        window.addEventListener('scroll', this.stickListener);
      },
      componentWillReceiveProps: function (props) {
        ClientActions.fetchMostRecentlyAddedFriends(props.params.userId);
        ClientActions.fetchPosts(props.params.userId);
      },
      componentWillUnmount: function () {
        window.removeEventListener('scroll', this.stickListener);
      },
      authorizedToEdit: function () {
        return this.profileOwnerId() === SessionStore.currentUser().id;
      },
      profileOwnerId: function () {
        return parseInt(this.props.params.userId) || SessionStore.currentUser().id
      },
      stickListener: function () {
        var timelineSidebar = document.getElementById('timeline-sidebar');
        var timelineMainContent =
          document.getElementById('timeline-main-content');
        if (document.body.scrollTop >= 401 && timelineSidebar.className !==
          'timeline-sidebar-stick') {
          timelineSidebar.className = 'timeline-sidebar-stick';
          timelineMainContent.className = 'timeline-main-content-unanchored';
        } else if (document.body.scrollTop < 401 &&
          timelineSidebar.className === 'timeline-sidebar-stick') {
          timelineSidebar.className = '';
          timelineMainContent.className = 'timeline-main-content-anchored';
        }
      }
    });

module.exports = Timeline;
