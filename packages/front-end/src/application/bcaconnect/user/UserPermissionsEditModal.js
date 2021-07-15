import { useRecoilValue } from 'recoil';

import { $permission, $user } from 'states';
import { useMutation } from 'hooks';

const UserPermissionsEditModal = ({ id }) => {
  const [updateUser] = useMutation($user.update(id));
  const permissions = useRecoilValue($permission.list);
  const user = useRecoilValue($user.read(id));

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
            <div key={`UserPermissionItem-${permission.id}`}>
              <div>{permission.action}</div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={
                    user.permissions.find(
                      user_permission =>
                        user_permission.permission.id === permission.id
                    )?.state ?? false
                  }
                  onChange={e => {
                    updateUser({
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

export default UserPermissionsEditModal;
