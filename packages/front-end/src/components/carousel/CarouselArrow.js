import { Button } from '@salesforce/design-system-react';

const CarouselArrow = ({ direction, onClick, style }) => (
  <div
    id={`carousel-arrow-${direction}`}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...style
    }}
  >
    <Button
      onClick={onClick}
      iconCategory="utility"
      iconSize="small"
      variant="icon"
      iconName={`chevron${direction}`}
      iconVariant="border-filled"
    />
  </div>
);

export default CarouselArrow;
