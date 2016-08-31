var React = require('react'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search'),
    SearchIndexItem = require('./SearchIndexItem'),
    SessionStore = require('../../stores/session');

var SearchIndex = React.createClass({
  getInitialState: function () {
    return({
      searching: false,
      searchString: '',
      selectedItem: undefined,
      users: SearchStore.all()
    });
  },
  render: function () {
    return (
      <div id='search-bar-container'>
        <form onSubmit={this.onSubmit}>
          <input autoComplete='off'
            id='search-bar'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            placeholder='Search Faceplace'
            ref='searchBar'
            value={this.state.searchString} />
        </form>
        <div id='search-index' className='overlay'>
          {this.renderSearchIndexItems()}
        </div>
      </div>
    );
  },
  renderSearchIndexItems: function () {
    if (this.state.searching) {
      return this.state.users.map(function (user, idx) {
        return(
          <SearchIndexItem key={idx}
            onFollowLink={this.onFollowLink}
            user={user} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.SearchListener = SearchStore.addListener(this.onSearchStoreChange);
  },
  componentWillUnmount: function () {
    this.SearchListener.remove();
  },
  clickOutListener: function (e) {
    if (!this.refs.searchBar.contains(e.target)) {
      this.hideIndexItems();
    }
  },
  arrowListener: function (e) {
    if (e.key === 'ArrowUp') {
      var difference = -1;
    } else if (e.key === 'ArrowDown') {
      var difference = 1;
    } else {
      return
    }
    this.arrowScroll(difference);
  },
  arrowScroll: function (difference) {
    if (this.state.selectedItem === undefined) {
      var selectedItem = difference;
    } else {
      var selectedItem = this.state.selectedItem + difference;
    }
    if (selectedItem < 0) {
      selectedItem = undefined
    } else if (selectedItem + 1 > this.state.users.length) {
      selectedItem = this.state.users.length - 1;
    }
    this.setState({ selectedItem: selectedItem }, function () {
      console.log(this.state);
    }.bind(this));
  },
  hideIndexItems: function (e) {
    document.removeEventListener('click', this.clickOutListener);
    document.removeEventListener('keyup', this.arrowListener);
    this.setState({ searching: false });
  },
  onFollowLink: function () {
    document.removeEventListener('click', this.clickOutListener);
    document.removeEventListener('keyup', this.arrowListener);
    this.setState({ searching: false, searchString: '' });
  },
  onSearchStoreChange: function (e) {
    this.setState({ users: SearchStore.all() }, this.setSelectedItem);
  },
  onSearchStringChange: function (e) {
    this.setState({ searchString: e.target.value }, function () {
      ClientActions.fetchSearchResults(this.state.searchString);
    });
  },
  onSubmit: function (e) {
    e.preventDefault();
  },
  setSelectedItem: function () {
    if (this.state.selectedItem < 0) {
      var selectedItem = undefined;
      var resetState = true;
    } else if (this.state.users.length === 0
      && this.state.selectedItem !== undefined) {
      var selectedItem = undefined;
      var resetState = true;
    } else if (this.state.selectedItem >= this.state.users.length) {
      var selectedItem = this.state.users.length - 1;
      var resetState = true;
    }
    if (resetState) {
      this.setState({ selectedItem: selectedItem }, function () {
        console.log(this.state);
      }.bind(this));
    }
  },
  showIndexItems: function (e) {
    if (this.state.searching) { return }
    ClientActions.fetchSearchResults(this.state.searchString);
    this.setState({ searching: true }, function () {
      document.addEventListener('click', this.clickOutListener);
      document.addEventListener('keyup', this.arrowListener);
    });
  }
});

module.exports = SearchIndex;
