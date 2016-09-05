var React = require('react'),
    LeftCol = require('./main/LeftCol'),
    RightCol = require('./main/RightCol'),
    PostIndex = require('./posts/PostIndex'),
    ClientActions = require('../actions/client_actions');

var Main = React.createClass({
  render: function () {
    return (
      <div id='main'>
        <table id='main-content'>
          <tbody>
            <tr>
              <LeftCol />
              <td id='feed'>
                <PostIndex />
              </td>
              <RightCol />
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  componentDidMount: function () {
    ClientActions.fetchPosts();
    window.addEventListener('scroll', this.stickListener);
    this.leftCol = document.getElementById('left-col-content');
    this.rightCol = document.getElementById('right-col-content');
  },
  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.stickListener);
  },
  stickListener: function () {
    if (document.body.scrollTop >= 43 && this.leftCol.className !==
      'left-col-stick') {
      this.leftCol.className = 'left-col-stick';
      this.rightCol.className = 'right-col-stick';
    } else if (document.body.scrollTop < 43 && this.leftCol.className ===
      'left-col-stick') {
      this.leftCol.className = '';
      this.rightCol.className = '';
    }
  }
});

module.exports = Main;
