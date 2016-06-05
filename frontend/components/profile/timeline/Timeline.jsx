var React = require('react'),
    ProfileApiUtil = require('../../../util/profile_api_util'),
    IntroIndex = require('./intro/IntroIndex'),
    ProfileActions = require('../../../actions/profile_actions'),
    SessionActions = require('../../../actions/session_actions');

    var Timeline = React.createClass({
      getInitialState: function () {
        return({profileFetched: false});
      },
      render: function () {
        console.log('Timeline#render');

        var timelineContent;
        var authorizedToEdit =
          parseInt(this.props.params.userId) === SessionStore.currentUser().id;
        
        if (ProfileStore.profileIsFetched()) {
          timelineContent = (
              <aside>
                <IntroIndex userId={this.props.params.userId}
                  authorizedToEdit={authorizedToEdit} />
              </aside>
          );
        } else {
          timelineContent = (
            <div className='empty-timeline-content'></div>
          );
        }

        return (
          <div className='timeline-content'>
            {timelineContent}
          </div>
        );
      },
      componentDidMount: function () {
        ProfileApiUtil.fetchProfile(this.props.params.userId);
        this.profileListener = ProfileStore.addListener(this.onProfileStoreChange);
      },
      componentWillUnmount: function () {
        this.profileListener.remove();
      },
       componentWillReceiveProps: function (newProps) {
         ProfileApiUtil.fetchProfile(newProps.params.userId);
       },
      onProfileStoreChange: function () {
        this.setState({profileFetched: true});
      }
    });

module.exports = Timeline;
