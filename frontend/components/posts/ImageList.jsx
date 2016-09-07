var React = require('react');

function ImageList (images) {
  return images.map(function (image, idx) {
    return renderImage(image, idx);
  });
}

function renderImage (image, idx) {
  return <img key={idx} src={image.url} />;
}

module.exports = ImageList;
