import {
  EditorSlidersHorizontal,
  EditorCanvas,
  EditorAttachments,
  EditorArrows
} from 'components/editor';

import { Grid } from 'components/layout';

const EditorSimple = () => {
  return (
    <Grid
      columns="1fr"
      rows="auto auto 1fr"
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }}
    >
      <EditorSlidersHorizontal />
      <EditorAttachments />

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

export default EditorSimple;
