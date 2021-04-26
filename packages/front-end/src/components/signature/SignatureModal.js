import { useRecoilValue, useRecoilState } from 'recoil';

import {
  ScopedNotification,
  Icon,
  DataTable,
  DataTableColumn,
  DataTableCell
} from '@salesforce/design-system-react';

import { WarningGe } from 'components/layout';
import { $roles, $roleSelected } from 'state';
import { useToast } from 'hooks';

const ErrorText = ({ children }) => (
  <div style={{ margin: '5px 0' }}>
    <ScopedNotification
      icon={
        <Icon
          assistiveText={{
            label: 'Erreur'
          }}
          category="utility"
          colorVariant="error"
          name="error"
          size="small"
        />
      }
      theme="light"
    >
      {children}
    </ScopedNotification>
  </div>
);

const NameRole = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <div>
      <strong>
        {props.item.Titre} {props.item.Name}
      </strong>
    </div>
    <div>
      <small>{props.item.Role}</small>
    </div>
  </DataTableCell>
);
NameRole.displayName = DataTableCell.displayName;

const SignatureModal = () => {
  const [roles, setRole] = useRecoilState($roleSelected);
  const options = useRecoilValue($roles);
  const { addToast } = useToast();

  if (options === null) {
    return (
      <div style={{ margin: '20px' }}>
        <ErrorText>
          Aucun acteurs n'est disponible pour la mission en cours
        </ErrorText>
      </div>
    );
  }

  return (
    <div
      id="signature-modal"
      style={{
        padding: '0px',
        overflow: 'auto',
        height: '100%'
      }}
    >
      <WarningGe />

      <DataTable
        fixedLayout
        items={options}
        id="upload-tree"
        onRowChange={(event, data) => {
          if (data.selection.length > 3) {
            addToast({
              type: 'warning',
              heading: `Vous pouvez ajouter seulement 3 personnes pour la signature`
            });
          } else {
            setRole(data.selection);
          }
        }}
        selection={roles.filter(({ Email, Phone }) => {
          return Email === '' && Phone === '' ? false : true;
        })}
        selectRows="checkbox"
      >
        <DataTableColumn label="Nom">
          <NameRole />
        </DataTableColumn>

        <DataTableColumn key="type" label="Téléphone" property="Phone" />
        <DataTableColumn key="name" label="Email" property="Email" />
      </DataTable>
    </div>
  );
};

export default SignatureModal;
