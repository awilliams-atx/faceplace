var React = require('react');

var RightCol = React.createClass({
  render: function () {
    return (
      <td id='right-col'>
        <aside id='right-col-content'>
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
              download='Andrew Williams Resume'
              href='https://s3.amazonaws.com/faceplace-dev/assets/AndrewWilliamsResume.pdf'
              id='resume'
              target='_blank'>
              <div className='showcase-icon right-col-content'>
                <i className="fa fa-file-text" aria-hidden="true"></i>
              </div>
              <div className='showcase-text right-col-content'>
                Resume
              </div>
            </a>
          </article>
        </aside>
      </td>
    );
  }
});

module.exports = RightCol;
