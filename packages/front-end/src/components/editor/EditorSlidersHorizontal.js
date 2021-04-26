import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { $scale, $contrast, $brightness, $saturation } from 'state';
import { Grid, Slider } from 'components/layout';
import { EditorToolbar } from 'components/editor';

const EditorSlidersHorizontal = () => {
  const [scale, setScale] = useRecoilState($scale);
  const [contrast, setContrast] = useRecoilState($contrast);
  const [brightness, setBrightness] = useRecoilState($brightness);
  const [saturation, setSaturation] = useRecoilState($saturation);

  const [displayZoom, setDisplayZoom] = useState(false);
  const [displaySliders, setdisplaySliders] = useState(false);

  return (
    <Grid columns="1fr" rows="auto auto">
      <EditorToolbar {...{ setDisplayZoom, setdisplaySliders }} />

      <Grid
        columns="repeat(4, 1fr)"
        rows="1fr"
        gap="10px"
        style={{
          marginLeft: '10px'
        }}
      >
        {displayZoom && (
          <Slider
            id="scale"
            label="Zoom"
            onChange={e => setScale(parseFloat(e.target.value))}
            value={scale}
            min={0.1}
            max={20}
            step={0.1}
          />
        )}

        {displaySliders && (
          <div style={{ display: 'contents' }}>
            <Slider
              id="contrast"
              label="Contraste"
              onChange={e => setContrast(parseFloat(e.target.value))}
              value={contrast}
              min={-100}
              max={100}
              step={5}
            />

            <Slider
              id="brightness"
              label="Luminosité"
              onChange={e => setBrightness(parseFloat(e.target.value))}
              value={brightness}
              min={-100}
              max={100}
              step={1}
            />

            <Slider
              id="saturation"
              label="Saturation"
              onChange={e => setSaturation(parseFloat(e.target.value))}
              value={saturation}
              min={0}
              max={3}
              step={0.1}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default EditorSlidersHorizontal;
