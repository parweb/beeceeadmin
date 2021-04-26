import { useState, useEffect, useRef, useCallback } from 'react';

import { chunk } from 'helpers';
import { Grid } from 'components/layout';

import {
  CarouselFrame,
  CarouselPanel,
  CarouselItem
} from 'components/carousel';

const Carousel = ({ data, children, rows, columns, fallback }) => {
  const sliderRef = useRef(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!sliderRef.current) return;

    const box = sliderRef.current.getBoundingClientRect();

    sliderRef.current.scrollTo({
      left: box.width * slide,
      top: 0,
      behavior: 'smooth'
    });
  }, [slide]);

  const itemsPerPanel = rows * columns;

  const chunks = chunk(data, itemsPerPanel);

  const prevSlide = useCallback(() => {
    if (slide === 0) setSlide(0);
    else setSlide(slide - 1);
  }, [slide]);

  const nextSlide = useCallback(() => {
    if (slide === chunks.length - 1) setSlide(chunks.length - 1);
    else setSlide(slide + 1);
  }, [slide, chunks.length]);

  useEffect(() => {
    const handle = ({ key: direction }) => {
      const match = {
        ArrowRight: nextSlide,
        ArrowLeft: prevSlide,
        default: () => {}
      };

      return (match[direction] || match['default'])();
    };

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [nextSlide, prevSlide]);

  const gotoSlide = setSlide;

  return (
    <CarouselFrame
      {...{ gotoSlide, nextSlide, prevSlide, sliderRef, chunks, slide }}
    >
      <Grid
        rows="1fr"
        columns={chunks.length === 0 ? 'auto' : `repeat(${chunks.length}, 1fr)`}
        style={{
          width: chunks.length === 0 ? '100%' : chunks.length * 100 + '%'
        }}
      >
        {data.length === 0 && fallback}

        {chunks.map((list, i) => (
          <CarouselPanel
            {...{ rows, columns }}
            panels={chunks}
            key={`CarouselPanel-${i}`}
          >
            {list.map((item, j) => (
              <CarouselItem key={`CarouselItem-${i}-${j}`}>
                {children({ item })}
              </CarouselItem>
            ))}
          </CarouselPanel>
        ))}
      </Grid>
    </CarouselFrame>
  );
};

export default Carousel;
