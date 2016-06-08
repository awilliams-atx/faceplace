var React = require('react'),
    TagSearchItem = require('./TagSearchItem'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      friends: TagStore.all(),
      taggedFriendIds: {}
    });
  },
  render: function () {
    console.log(this.state.friends);
    console.log(this.state.taggedFriendIds);

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
        <div className='tagged-friends-search-results overlay group'>
          {
            filteredFriends.map(function (friend) {
              return (
                <div
                  className='tagged-friends-search-result group'
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
      );
    } else {
      tagSearchItems = <div className='empty-tagged-friends-search-results'/>;
    }


    var taggedFriends;

    var ids = Object.keys(this.state.taggedFriendIds);

    if (ids.length > 0) {

      taggedFriends = (
        <div className='tagged-friends-list'>
          {
            ids.map(function (id) {
              var friend = TagStore.find(id);

              return (
                <div className='tagged-friend-list-item'
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

    return (
      <div className='tagging-container group'>
        {taggedFriends}
        <div className='tag-with'>With:</div>
        <div className='tagging-field'>
          <input className='tagged-friends-input'
            placeholder='Who are you with?'
            onChange={this.onSearchStringChange}
            value={this.state.searchString}
            ref='autoFocus' />
        </div>
        {tagSearchItems}
      </div>
    );
  },
  componentDidMount: function () {
    this.refs.autoFocus.focus();
    this.tagListener = TagStore.addListener(this.onTagStorechange);
    TagApiUtil.fetchFriendsForTagging();
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value});
  },
  onTagStorechange: function () {
    this.setState({friends: TagStore.all()});
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
      tagging: false,
      searchString: '',
      friends: friends,
      taggedFriendIds: taggedFriendIds
    }, function () {
      console.log(this.state);
    });
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
    });
  }
});

module.exports = TagSearch;
