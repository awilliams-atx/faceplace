var React = require('react');

var TagSearchItem = React.createClass({
  render: function () {
    return (
      <div className={this.className() + 'search-index-item group'}
        data-idx={this.props.idx}
        data-userid={this.props.friend.userId}
        key={this.props.friend.userId}
        onClick={this.props.onTag}
        onMouseEnter={this.props.onMouseEnter}>
        <div className='search-icon'>
          <img src={this.props.friend.postPicUrl} />
        </div>
        <div className='search-text'>
          <strong>{this.props.friend.fullName}</strong>
          <br />
          <small>{this.props.friend.location}</small>
        </div>
      </div>
    );
  },
  className: function () {
    if (this.props.idx === this.props.cursor) {
      return 'selected-tag-item ';
    } else {
      return '';
    }
  }
});

module.exports = TagSearchItem;
