var React = require('react');

function Images(images, remove) {
  return images.map(function (img, idx) {
    return renderImage(img, remove, idx);
  });
}

function renderImage(image, remove, idx) {
  return (
    <div className='upload-image-container' key={idx}>
      <img src={URL.createObjectURL(image)} />
      <div className='tinter' />
    </div>
  );
}

module.exports = Images;
