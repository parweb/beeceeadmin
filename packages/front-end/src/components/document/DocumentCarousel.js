import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import {
  DocumentItem,
  DocumentNone,
  DocumentLoading,
  DocumentError
} from 'components/document';

import {
  Toolbar,
  Modal,
  ModalConfirmation,
  WarningGe
} from 'components/layout';

import { Carousel } from 'components/carousel';
import { SignatureToolbar } from 'components/signature';
import { DissociationToolbar } from 'components/dissociation';

import { $documentsView } from 'state';
import { useResponsiveCarousel } from 'hooks';

const DocumentList = () => {
  const { rows, columns } = useResponsiveCarousel();
  const data = useRecoilValue($documentsView);

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <Toolbar />

      {data === null && <DocumentError />}

      {data && 'length' in data && (
        <>
          <WarningGe />

          <div id="documents-list" style={{ margin: '10px 0' }}>
            <Carousel {...{ rows, columns, data }} fallback={<DocumentNone />}>
              {({ item }) => <DocumentItem key={item.idDocNum} {...item} />}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
};

const DocumentCarousel = () => {
  return (
    <div id="document-carousel">
      <Suspense fallback={<DocumentLoading />}>
        <DocumentList />
      </Suspense>

      <DissociationToolbar />
      <SignatureToolbar />

      <Modal key="modal-primary" />
      <ModalConfirmation key="modal-secondary" />
    </div>
  );
};

export default DocumentCarousel;
