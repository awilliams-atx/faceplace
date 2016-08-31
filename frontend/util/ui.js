var ui = { scrollPost: undefined };

var UIManipulator = {
  clearScrollPost: function () {
    ui.scrollPost = undefined;
  },
  focusScrollPost: function (post) {
    post.getElementsByTagName('textarea')[0].focus();
  },
  scrollPost: function () {
    return ui.scrollPost;
  },
  scrollToPost: function (id) {
    if (id && ui.scrollPost !== id) { return }
    id = ui.scrollPost;
    var post = document.getElementById(id);
    if (!post) { return }
    window.scrollTo(0, post.offsetTop - 20);
    this.styleScrollPost(post);
    this.focusScrollPost(post);
    this.clearScrollPost();
  },
  setScrollPost: function (id) {
    ui.scrollPost = id;
  },
  styleScrollPost: function (post) {
    var head = post.getElementsByClassName('post-head')[0];
    head.className += ' scroll-post-flash';
    setTimeout(function () {
      head.className = head.classList[0];
    }, 1200);
  }
}

module.exports = UIManipulator;
