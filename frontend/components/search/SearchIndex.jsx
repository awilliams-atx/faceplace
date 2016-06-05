var React = require('react'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    UserStore = require('../../stores/user'),
    SearchIndexItem = require('./SearchIndexItem');

var SearchIndex = React.createClass({
  getInitialState: function () {
    return({
      searching: false,
      searchString: "",
      users: UserStore.all()
    });
  },
  render: function () {
    var searchIndexItems;

    if (this.state.searching) {
      var users;

      filteredUsers = this.state.users.filter(function (user) {
        var name = (user.firstName + ' ' + user.lastName).toLowerCase();
        return name.match(this.state.searchString.toLowerCase());
      }.bind(this));

      searchIndexItems = filteredUsers.map(function (user) {
          return <SearchIndexItem
            user={user}
            key={user.id}
            clickHandler={this.hideIndexItems} />;
        }.bind(this));
    } else {
      searchIndexItems = <div className='notSearching'></div>;
    }

    // value={this.state.searchString}
    return (
      <div className='nav-search' id='search-bar'>
        <form _onSubmit={this.handleSubmit} >
          <input placeholder='Search Faceplace'
            onChange={this.onSearchStringChange}
            onClick={this.showIndexItems}
            className='search-bar' />
        </form>

        <div className='search-index-items'>
          {searchIndexItems}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
    $(document).keydown(function (event) {
      if (event.which === 27) { this.setState({searching: false}); }
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
  onUserStoreChange: function (e) {
    this.setState({users: UserStore.all()});
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value});
  },
  showIndexItems: function (e) {
    if (this.state.searching) { return; }
    if (!this.state.areUsersFetched) {
      ClientActions.fetchUsers();
    }
    this.setState({
      searching: true,
      areUsersFetched: true
    }, function () {
         this.clickListener = function (e) {
           var searchBar = document.getElementById('search-bar');

           if (!searchBar.contains(e.target)) {
            this.hideIndexItems();
           }
         }.bind(this);

       document.getElementsByTagName('body')[0]
        .addEventListener('click', this.clickListener);
    });
  },
  hideIndexItems: function (e) {
    document.getElementsByTagName('body')[0]
      .removeEventListener('click', this.clickListener);
    this.setState({searching: false});
  },
  handleSubmit: function (e) {
    e.preventDefault();

  }
});

module.exports = SearchIndex;
