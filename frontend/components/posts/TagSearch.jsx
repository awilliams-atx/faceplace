var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      friends: TagStore.allFriends(),
      taggedFriendIds: TagStore.allTaggedFriendIds(),
      tagging: this.props.tagging
    });
  },
  render: function () {

    var taggedFriends;

    var ids = Object.keys(this.state.taggedFriendIds);

    if (ids.length > 0) {

      taggedFriends = (
        <div className='tagged-friends-list group'>
          <div className='tagged-friends-with'>{'-- with '}</div>
          {
            ids.map(function (id) {
              var friend = TagStore.find(id);

              return (
                <div className='tagged-friends-list-item'
                  data-userid={id}
                  key={id}
                  onClick={this.untagFriend}>
                  {friend.fullName}
                </div>
              );
            }.bind(this))
          }
        </div>
      );
    } else {
      taggedFriends = <div className='empty-tagged-friends' />;
    }

    var taggingField;

    if (this.state.tagging) {
      taggingField = (
        <div className='tagging-field-container'>
          <div className='tagging-field-with'>With:</div>
          <div className='tagging-field'>
            <input className='tagged-friends-input'
              placeholder='Who are you with?'
              onChange={this.onSearchStringChange}
              value={this.state.searchString}
              ref='autoFocus' />
          </div>
        </div>
      );
    } else {
      taggingField = <div className='emptyTaggingField' />;
    }

    var filteredFriends,
        friends = this.state.friends;

    friends = Object.keys(friends).map(function (id) {
      return friends[id];
    });

    if (this.state.searchString === '') {
      filteredFriends = [];
    } else {
      filteredFriends = friends.filter(function (friend) {
        var name = (friend.fullName).toLowerCase();
        return name.match(this.state.searchString.toLowerCase());
      }.bind(this));
    }

    if (filteredFriends.length > 0) {
      tagSearchItems = (
        <div className='tag-search-anchor-point'>
          <div className='tagging-friends-search-results overlay group'>
            {
              filteredFriends.map(function (friend) {
                return (
                  <div
                    className='tagging-friends-search-result group'
                    onClick={this.onTagFriend}
                    key={friend.userId}
                    data-userid={friend.userId} >
                    <img src={friend.postPicUrl} />
                    <strong>{friend.fullName}</strong>
                  </div>
                );
              }.bind(this))
            }
          </div>
        </div>
      );
    } else {
      tagSearchItems = <div className='empty-tagged-friends-search-results'/>;
    }

    return (
      <div className='tagging-container group'>
        {taggedFriends}
        {taggingField}
        {tagSearchItems}
      </div>
    );
  },
  componentDidMount: function () {
    if (this.state.tagging) {
      this.refs.autoFocus.focus();
    }
    this.tagListener = TagStore.addListener(this.onTagStorechange);
  },
  componentWillReceiveProps: function (props) {
    this.setState({tagging: props.tagging});
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value});
  },
  onTagStorechange: function () {
    this.setState({
      friends: TagStore.allFriends(),
      taggedFriendIds: TagStore.allTaggedFriendIds()
    });
  },
  onTagFriend: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);

    var taggedFriendIds = {};
    taggedFriendIds[friendId] = true;
    taggedFriendIds = $.extend(taggedFriendIds, this.state.taggedFriendIds);

    var friends = $.extend({}, this.state.friends);
    delete friends[friendId];

    this.setState({
      searchString: '',
      friends: friends,
      taggedFriendIds: taggedFriendIds
    }, function () {
      ClientActions.addTaggedFriend(friendId);
      this.refs.autoFocus.focus();
    }.bind(this));
  },
  untagFriend: function (e) {
    var friendId = parseInt(e.target.dataset.userid);

    var taggedFriendIds = $.extend({}, this.state.taggedFriendIds);
    delete taggedFriendIds[friendId];

    var friends = $.extend({}, this.state.friends);
    friends[friendId] = TagStore.find(friendId);

    this.setState({
      tagging: false,
      taggedFriendIds: taggedFriendIds,
      friends: friends
    }, function () {
      ClientActions.removeTaggedFriend(friendId);
    });
  }
});

module.exports = TagSearch;
