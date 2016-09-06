var React = require('react');

function Images(images, remove) {
  return images.map(function (img, idx) {
    return renderImage(img, remove, idx);
  });
}

function renderImage(image, remove, idx) {
  return (
    <div className='upload-image' key={idx}>
      <img src={URL.createObjectURL(image)} />
    </div>
  );
}

module.exports = Images;
