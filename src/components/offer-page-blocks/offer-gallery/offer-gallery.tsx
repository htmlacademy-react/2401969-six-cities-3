import { memo } from 'react';
import { MAX_GALLERY_PHOTOS } from '../../../const';

type OfferGalleryProps = {
  images: string[];
}
const OfferGallery = memo(({ images }: OfferGalleryProps): JSX.Element => {
  const galleryImages = images.slice(0, MAX_GALLERY_PHOTOS);
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {galleryImages.map((item) => (
          <div className="offer__image-wrapper" key={item}>
            <img className="offer__image" src={item} alt="Photo studio" />
          </div>
        ))}

      </div>
    </div>
  );
});

OfferGallery.displayName = 'OfferGallery';

export { OfferGallery };

