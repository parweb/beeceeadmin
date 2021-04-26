import { useRecoilValue } from 'recoil';
import { DataTableColumn, DataTable } from '@salesforce/design-system-react';

import { $upload } from 'state';

const UploadTree = () => {
  const items = useRecoilValue($upload);

  return (
    <DataTable items={items} id="upload-tree">
      <DataTableColumn key="type" label="Type" property="type" />
      <DataTableColumn key="name" label="Nom" property="name" />
      <DataTableColumn key="delete" label="" property="delete" />
    </DataTable>
  );
};

export default UploadTree;
