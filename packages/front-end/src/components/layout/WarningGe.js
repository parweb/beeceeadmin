import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ScopedNotification } from '@salesforce/design-system-react';

import { $recordType } from 'state';

const Sticky = styled.div`
  z-index: 1;
  position: sticky;
  top: 64px;

  .slds-scoped-notification {
    display: flex;

    align-items: center;
    justify-content: center;
  }

  .slds-media__body {
    flex: inherit;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
  }
`;

const mappingDisplay = {
  XPS: false,
  default: true,
  null: false
};

const WarningGe = () => {
  const recordType = useRecoilValue($recordType);

  return (
    (mappingDisplay[recordType] ?? mappingDisplay['default']) && (
      <Sticky>
        <ScopedNotification className="error" theme="light">
          Dossier en gestion dans GE
        </ScopedNotification>
      </Sticky>
    )
  );
};

export default WarningGe;
