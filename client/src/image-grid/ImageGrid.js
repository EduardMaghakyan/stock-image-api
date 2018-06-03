import React from "react";

const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid container">
      <div className="row">
        {images.map(imageData => {
          let { id, url, context } = imageData;
          return (
            <div key={id} className="image-grid-item col-md-6">
              <div className="card box-shadow">
                <img
                  className="image-grid-item-image card-img-top"
                  src={url}
                  alt={url}
                />
                <div className="card-body justify-content-center align-items-center">
                  <a
                    href={context}
                    className="btn btn-primary image-grid-item-url"
                    target="_blank"
                  >
                    Go to source
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;
