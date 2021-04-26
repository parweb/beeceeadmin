import { useEffect, useRef } from 'react';
import useMedia from 'use-media';

import { Grid, GridColumn } from 'components/layout';
import { FilterBadges } from 'components/filter';

const Bullets = ({ chunks, slide, gotoSlide }) => {
  const isSmall = useMedia({ maxWidth: '710px' });
  const container = useRef(null);

  useEffect(() => {
    if (container?.current !== null) {
      try {
        const boxParent = container.current.getBoundingClientRect();

        const boxCurrent = container.current.children[
          slide
        ].getBoundingClientRect();
        const x = boxCurrent.x - boxParent.x;
        const scrollLeft = container.current.scrollLeft;

        container.current.scrollTo({
          left: x + boxCurrent.width / 2 + scrollLeft - boxParent.width / 2,
          top: 0,
          behavior: 'smooth'
        });
      } catch (_) {}
    }
  }, [chunks, slide]);

  return (
    <GridColumn
      style={{ margin: '10px 0' }}
      position={isSmall ? [1, 2] : [3, 10]}
      id="carousel-legend"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'center'
        }}
      >
        <div
          ref={container}
          style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {chunks.map((_, i) => (
            <div
              data-testid="CarouselLegend"
              id={`CarouselLegend-${i}`}
              key={`CarouselLegend-${i}`}
              onClick={() => gotoSlide(i)}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                margin: '6px 5px 0 5px',
                width: '1rem',
                height: '1rem',
                border: '1px solid' + (slide === i ? '#0070d2' : '#dddbda'),
                borderRadius: '50%',
                backgroundColor: slide === i ? '#0070d2' : '#fff'
              }}
            />
          ))}
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>
          {slide + 1} / {chunks.length}
        </div>
      </div>
    </GridColumn>
  );
};

const CarouselLegend = ({ id = null, chunks = [], slide, gotoSlide }) => {
  const isSmall = useMedia({ maxWidth: '710px' });

  return (
    <>
      <div />
      <Grid
        columns={isSmall ? 'auto 1fr' : 'repeat(12, 1fr)'}
        style={{ textAlign: 'center' }}
        id={id}
      >
        <Bullets {...{ chunks, slide, gotoSlide }} />
        <Grid
          columns="auto auto auto"
          gap="5px"
          position={isSmall ? [1, 1] : [1, 2]}
          style={{
            textAlign: 'left',
            padding: '6px 0px'
          }}
        >
          <FilterBadges />
        </Grid>
      </Grid>
      <div />
    </>
  );
};

export default CarouselLegend;
