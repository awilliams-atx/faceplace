var ui = { scrollPost: undefined };

var UIManipulator = {
  clearScrollPost: function () {
    ui.scrollPost = undefined;
  },
  scrollPost: function () {
    return ui.scrollPost;
  },
  scrollToPost: function (id) {
    if (id && ui.scrollPost !== id) { return }
    id = ui.scrollPost;
    var post = document.getElementById(id);
    if (!post) { return }
    console.log('SCROLLING');
    window.scrollTo(0, post.offsetTop - 20);
    this.clearScrollPost();
  },
  setScrollPost: function (id) {
    ui.scrollPost = id;
  }
}

module.exports = UIManipulator;
