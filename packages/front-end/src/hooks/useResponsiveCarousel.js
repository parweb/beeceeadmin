import useMedia from 'use-media';

const useResponsiveCarousel = () => {
  const xs = useMedia({ maxWidth: '450px' });
  const md = useMedia({ minWidth: '451px', maxWidth: '860px' });
  const lg = useMedia({ minWidth: '861px', maxWidth: '1024px' });
  const xl = useMedia({ minWidth: '1025px' });

  let carouselSize = { rows: 3, columns: 1 };

  xs && (carouselSize = { rows: 3, columns: 1 });
  md && (carouselSize = { rows: 5, columns: 2 });
  lg && (carouselSize = { rows: 5, columns: 4 });
  xl && (carouselSize = { rows: 4, columns: 5 });

  return carouselSize;
};

export default useResponsiveCarousel;
