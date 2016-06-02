var React = require('react');

var Search = React.createClass({
  getInitialState: function () {
    return({
      searchString: ""
    });
  },
  render: function () {
    return (
      <div className='nav-search'>
        <form _onSubmit={this._handleSubmit}>
          <input placeholder='Search Faceplace'
                 onChange={this._onChange}
                 value={this.state.searchString}/>
        </form>
      </div>
      // <SearchIndex />
    );
  },
  _onChange: function (e) {
    this.setState({searchString: e.target.value});
  },
  _handleSubmit: function (e) {
    e.preventDefault();
    
  }
});

module.exports = Search;
