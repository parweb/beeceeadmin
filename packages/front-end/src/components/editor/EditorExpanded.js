import { EditorCanvas, EditorArrows } from 'components/editor';

import { Grid } from 'components/layout';

const EditorExpanded = () => {
  return (
    <Grid
      columns="1fr"
      rows="1fr"
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            overflow: 'hidden scroll',
            position: 'absolute',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }}
        >
          <EditorCanvas />
          <EditorArrows />
        </div>
      </div>
    </Grid>
  );
};

export default EditorExpanded;
