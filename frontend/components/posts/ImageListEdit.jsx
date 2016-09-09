var React = require('react');

function ImageListEdit(images, remove) {
  return images.map(function (img, idx) {
    return renderImage(img, remove, idx);
  });
}

function renderImage(image, remove, idx) {
  return (
    <div className='upload-image-container' key={idx}>
      <img src={srcUrl(image)} />
      <div className='image-options tinter-before'>
        <i className="fa fa-times"
          aria-hidden="true"
          data-idx={idx}
          onClick={remove}>
        </i>
      </div>
    </div>
  );
}

function srcUrl (image) {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    return image.url;
  }
}

module.exports = ImageListEdit;
