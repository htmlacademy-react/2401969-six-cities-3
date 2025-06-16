import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';
import { renderWithProviders } from '../../../utils/mock-component';
import { MAX_GALLERY_PHOTOS } from '../../../const';

describe('Component: OfferGallery', () => {
  const mockImages = [
    'img/photo1.jpg',
    'img/photo2.jpg',
    'img/photo3.jpg',
    'img/photo4.jpg',
    'img/photo5.jpg',
    'img/photo6.jpg',
    'img/photo7.jpg',
    'img/photo8.jpg',
  ];

  it('should render the correct number of images', () => {
    renderWithProviders(<OfferGallery images={mockImages} />);
    const renderedImages = screen.getAllByRole('img', { name: /photo studio/i });
    expect(renderedImages.length).toBe(Math.min(mockImages.length, MAX_GALLERY_PHOTOS));
  });

  it('should render images correctly when less than MAX_GALLERY_PHOTOS', () => {
    const fewerImages = mockImages.slice(0, 3);
    renderWithProviders(<OfferGallery images={fewerImages} />);
    const renderedImages = screen.getAllByRole('img', { name: /photo studio/i });
    expect(renderedImages.length).toBe(fewerImages.length);
  });

  it('should not render more than MAX_GALLERY_PHOTOS', () => {
    const excessImages = mockImages.slice(0, 8); // Пример: передаем 8 изображений
    renderWithProviders(<OfferGallery images={excessImages} />);
    const renderedImages = screen.getAllByRole('img', { name: /photo studio/i });
    expect(renderedImages.length).toBe(MAX_GALLERY_PHOTOS); // Ожидаем 6
  });

  it('should render images with correct src attributes', () => {
    renderWithProviders(<OfferGallery images={mockImages} />);
    const renderedImages = screen.getAllByRole('img', { name: /photo studio/i });
    renderedImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockImages[index]);
    });
  });
});
