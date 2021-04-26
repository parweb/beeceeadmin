import {
  EditorSlidersVertical,
  EditorCanvas,
  EditorThumbnails,
  EditorAttachments,
  EditorArrows
} from 'components/editor';

import { Grid } from 'components/layout';

const EditorAdvanced = () => {
  return (
    <Grid
      columns="1fr"
      rows="auto 1fr"
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }}
    >
      <EditorThumbnails />

      <Grid columns="200px 1fr" rows="1fr">
        <EditorSlidersVertical />

        <Grid columns="1fr" rows="auto 1fr">
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
            </div>

            <EditorArrows />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditorAdvanced;
