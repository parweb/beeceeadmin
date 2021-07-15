import { useRecoilValue } from 'recoil';

import { $permission, $role } from 'states';
import { useMutation } from 'hooks';

const RolePermissionsEditModal = ({ id }) => {
  const [updateRole] = useMutation($role.update(id));
  const permissions = useRecoilValue($permission.list);
  const role = useRecoilValue($role.read(id));

  const subjects = [...new Set(permissions.map(({ subject }) => subject))];
  const groupBy_subject = subjects.reduce(
    (carry, subject) => ({
      ...carry,
      [subject]: permissions.filter(
        permission => permission.subject === subject
      )
    }),
    {}
  );

  return (
    <div>
      {Object.entries(groupBy_subject).map(([subject, permissions]) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <div>{subject}</div>

          {permissions.map(permission => (
            <div key={`RolePermissionItem-${permission.id}`}>
              <div>{permission.action}</div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={
                    role.permissions.find(
                      role_permission =>
                        role_permission.permission.id === permission.id
                    )?.state ?? false
                  }
                  onChange={e => {
                    updateRole({
                      permission: {
                        id: permission.id,
                        value: e.target.checked
                      }
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RolePermissionsEditModal;
