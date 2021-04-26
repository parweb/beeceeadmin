import { atom } from 'recoil';
import jwtDecode from 'jwt-decode';

const permissions = {
  // 0556574343 === assuré
  '0556574343': {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: true,
    CAN_EDIT_MISSION: false,
    CAN_DISSOCIATE_MISSION: false,
    CAN_SIGN_MISSION: false
  },
  // 0238787100 === assuré
  '0238787100': {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: true,
    CAN_EDIT_MISSION: false,
    CAN_DISSOCIATE_MISSION: false,
    CAN_SIGN_MISSION: false
  },
  // RP96206 === réparateur
  RP96206: {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: true,
    CAN_EDIT_MISSION: false,
    CAN_DISSOCIATE_MISSION: false,
    CAN_SIGN_MISSION: false
  },
  // GOLD9478 === Client
  GOLD9478: {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: true,
    CAN_EDIT_MISSION: false,
    CAN_DISSOCIATE_MISSION: false,
    CAN_SIGN_MISSION: false
  },
  READ_ONLY: {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: false,
    CAN_EDIT_MISSION: false,
    CAN_DISSOCIATE_MISSION: false,
    CAN_SIGN_MISSION: false
  },
  default: {
    CAN_DISPLAY_MISSION: true,
    CAN_UPLOAD_MISSION: true,
    CAN_EDIT_MISSION: true,
    CAN_DISSOCIATE_MISSION: true,
    CAN_SIGN_MISSION: true
  }
};

let jwt = { sub: 'default' };

try {
  const token = new URL(
    'http://url.com/' + document.location.search
  ).searchParams.get('token');

  jwt = jwtDecode(token);

  jwt.sub = permissions[jwt.sub] ? jwt.sub : 'READ_ONLY';
} catch (_) {
  jwt = { sub: 'default' };
}

const $permissions = atom({
  key: 'permissions',
  default: permissions[jwt.sub] ?? permissions.default
});

export default $permissions;
