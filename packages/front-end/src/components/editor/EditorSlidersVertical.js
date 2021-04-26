import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import {
  $rotate,
  $scale,
  $contrast,
  $brightness,
  $saturation,
  $document
} from 'state';

import {
  DocumentItemName,
  DocumentItemDate,
  DocumentItemActions
} from 'components/document';

import { Slider } from 'components/layout';
import { format } from 'helpers';

const EditorSlidersVertical = () => {
  const [editMode, setEditMode] = useState(false);

  const document = useRecoilValue($document);

  const setRotate = useSetRecoilState($rotate);
  const [scale, setScale] = useRecoilState($scale);
  const [contrast, setContrast] = useRecoilState($contrast);
  const [brightness, setBrightness] = useRecoilState($brightness);
  const [saturation, setSaturation] = useRecoilState($saturation);

  const isPdf = format(document.externalUrl) === 'pdf';

  if (!document) return null;

  return (
    <div
      id="toolbar-editor"
      style={{
        textAlign: 'center',
        borderRight: '1px solid gray'
      }}
    >
      {!isPdf && (
        <>
          <Button
            id="rotate"
            style={{
              margin: '12px',
              border: '1px solid #E2E8F0',
              width: '50%',
              padding: '5px',
              justifyContent: 'space-between'
            }}
            iconCategory="utility"
            iconName="rotate"
            variant="icon"
            iconSize="large"
            onClick={() => {
              setRotate(rotate => rotate + 90);
            }}
          >
            <span style={{ margin: '0 auto' }}>Pivoter</span>
          </Button>
          <div style={{ margin: '10px 20px' }}>
            <Slider
              id="scale"
              label="Zoom"
              onChange={e => setScale(parseFloat(e.target.value))}
              value={scale}
              min={0.1}
              max={20}
              step={0.1}
            />
          </div>
          <div style={{ margin: '10px 20px' }}>
            <Slider
              style={{ margin: '10px 20px' }}
              id="contrast"
              label="Contraste"
              onChange={e => setContrast(parseFloat(e.target.value))}
              value={contrast}
              min={-100}
              max={100}
              step={5}
            />
          </div>
          <div style={{ margin: '10px 20px' }}>
            <Slider
              id="brightness"
              label="Luminosité"
              onChange={e => setBrightness(parseFloat(e.target.value))}
              value={brightness}
              min={-100}
              max={100}
              step={1}
            />
          </div>
          <div style={{ margin: '10px 20px' }}>
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
        </>
      )}
      <DocumentItemName
        idDocNum={document.idDocNum}
        {...{ editMode, setEditMode }}
      />
      <DocumentItemDate idDocNum={document.idDocNum} />
      <DocumentItemActions
        idDocNum={document.idDocNum}
        {...{ editMode, setEditMode }}
      />
    </div>
  );
};

export default EditorSlidersVertical;
