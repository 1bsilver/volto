import { getImageAttributes } from './Image';
import config from '@plone/volto/registry';

describe('Image', () => {
  describe('getSrcSet', () => {
    config.settings.imageScales = {
      large: 768,
      preview: 400,
      mini: 200,
      thumb: 128,
      tile: 64,
      icon: 32,
      listing: 16,
    };

    it('returns srcset from url', () => {
      expect(
        getImageAttributes(
          'http://localhost:8080/Plone/photo.png/@@images/image',
        ),
      ).toEqual({
        src: '/photo.png/@@images/image/listing',
        srcSet: [
          '/photo.png/@@images/image/large 768w',
          '/photo.png/@@images/image/preview 400w',
          '/photo.png/@@images/image/mini 200w',
          '/photo.png/@@images/image/thumb 128w',
          '/photo.png/@@images/image/tile 64w',
          '/photo.png/@@images/image/icon 32w',
          '/photo.png/@@images/image/listing 16w',
          '/photo.png/@@images/image 1200w',
        ],
      });
    });
  });
});