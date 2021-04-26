import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { Button } from '@salesforce/design-system-react';

import { $mission, $rotate, $document } from 'state';
import { useInIframe } from 'hooks';
import { format } from 'helpers';

const EditorToolbar = ({ setDisplayZoom, setdisplaySliders }) => {
  const idMiss = useRecoilValue($mission);
  const setRotate = useSetRecoilState($rotate);
  const document = useRecoilValue($document);

  const isPdf = format(document.externalUrl) === 'pdf';

  const isInIframe = useInIframe();

  return (
    <div
      id="toolbar-editor"
      style={{
        margin: '10px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Button
        id="scale"
        style={{
          border: '1px solid #E2E8F0',
          padding: '5px'
        }}
        disabled={isPdf}
        iconCategory="utility"
        iconName="zoomin"
        variant="icon"
        iconSize="large"
        onClick={() => {
          setdisplaySliders(false);
          setDisplayZoom(display => !display);
        }}
      />

      <Button
        id="rotate"
        style={{
          border: '1px solid #E2E8F0',
          padding: '5px'
        }}
        disabled={isPdf}
        iconCategory="utility"
        iconName="rotate"
        variant="icon"
        iconSize="large"
        onClick={() => {
          setRotate(rotate => rotate + 90);
        }}
      />

      <Button
        id="coloration"
        style={{
          border: '1px solid #E2E8F0',
          padding: '5px'
        }}
        disabled={isPdf}
        iconCategory="utility"
        iconName="slider"
        variant="icon"
        iconSize="large"
        onClick={() => {
          setDisplayZoom(false);
          setdisplaySliders(display => !display);
        }}
      />

      <Link
        to={`/mission/${idMiss}/document/${document.idDocNum}/advanced`}
        target={isInIframe ? '_blank' : ''}
      >
        <Button
          id="open-editor-advanced"
          style={{
            border: '1px solid #E2E8F0',
            padding: '5px'
          }}
          iconCategory="utility"
          iconName="expand"
          variant="icon"
          iconSize="large"
        />
      </Link>
    </div>
  );
};

export default EditorToolbar;
