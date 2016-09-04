var React = require('react');

var RightCol = React.createClass({
  render: function () {
    return (
      <aside id='right-col'>
        <article className='right-col-item'>
          <a className='right-col-container group'
            href='https://github.com/awilliams-atx'
            id='github'
            target='_blank'>
            <div className='showcase-icon right-col-content'>
              <i className="fa fa-github" aria-hidden="true"></i>
            </div>
            <div className='showcase-text right-col-content'>
              GitHub
            </div>
          </a>
        </article>
        <article className='right-col-item'>
          <a className='right-col-container group'
            href='https://www.linkedin.com/in/awilliamsatx'
            id='linked-in'
            target='_blank'>
            <div className='showcase-icon right-col-content'>
              Linked
            </div>
            <div className='showcase-text right-col-content'>
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            </div>
          </a>
        </article>
        <article className='right-col-item'>
          <a className='right-col-container group'
            href='http://www.andrewwilliams.io'
            id='portfolio'
            target='_blank'>
            <div className='showcase-icon right-col-content'>
              <i className="fa fa-folder-open" aria-hidden="true"></i>
            </div>
            <div className='showcase-text right-col-content'>
              Portfolio
            </div>
          </a>
        </article>
      </aside>
    );
  }
});

module.exports = RightCol;
