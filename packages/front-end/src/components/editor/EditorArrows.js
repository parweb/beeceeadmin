import { CarouselArrow } from 'components/carousel';
import { useEditorNavigation } from 'hooks';

const EditorArrows = () => {
  const { next, prev } = useEditorNavigation();

  return (
    <>
      <CarouselArrow
        style={{
          position: 'absolute',
          top: '0px',
          left: '24px',
          bottom: '0px'
        }}
        onClick={prev}
        direction="left"
      />

      <CarouselArrow
        style={{
          position: 'absolute',
          top: '0px',
          right: '24px',
          bottom: '0px'
        }}
        onClick={next}
        direction="right"
      />
    </>
  );
};

export default EditorArrows;
