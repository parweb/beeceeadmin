import { CarouselArrow, CarouselLegend } from 'components/carousel';
import { Grid } from 'components/layout';

const CarouselFrame = ({
  children,
  gotoSlide,
  prevSlide,
  nextSlide,
  sliderRef,
  chunks,
  slide
}) => {
  return (
    <Grid id="carousel-frame" rows="1fr" columns="26px 1fr 26px">
      <CarouselLegend
        id="CarouselLegend"
        chunks={chunks}
        slide={slide}
        gotoSlide={gotoSlide}
      />

      <CarouselArrow onClick={prevSlide} direction="left" />

      <div ref={sliderRef} style={{ overflow: 'hidden' }}>
        {children}
      </div>

      <CarouselArrow onClick={nextSlide} direction="right" />

      <CarouselLegend
        id="CarouselLegend"
        chunks={chunks}
        slide={slide}
        gotoSlide={gotoSlide}
      />
    </Grid>
  );
};

export default CarouselFrame;
