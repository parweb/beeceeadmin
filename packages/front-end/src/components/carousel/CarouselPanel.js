import { Grid } from 'components/layout';

const CarouselPanel = ({ children, panels, rows, columns }) => (
  <Grid
    rows={`repeat(${rows}, 1fr)`}
    columns={`repeat(${columns}, 1fr)`}
    gap="10px"
  >
    {children}
  </Grid>
);

export default CarouselPanel;
