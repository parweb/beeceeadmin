import axios from 'axios';

import { orderBy } from 'helpers';

const getRoles = async ({ missionId }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/roles?mission=${missionId}`
    );

    return data
      .sort(orderBy('Name', 'asc', x => x.toLowerCase()))
      ?.map(({ Name, Email, Phone, Role, Titre }) => ({
        id: Name + Email + Phone + Role + Titre,
        Name,
        Email,
        Phone,
        Role,
        Titre
      }));
  } catch (_) {
    return null;
  }
};

export default getRoles;
