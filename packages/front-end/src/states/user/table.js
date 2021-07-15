import { selector } from 'recoil';

import { $user } from 'states';
import { applyFilter, orderBy } from 'helpers';

const searchCriteria = Object.entries({
  search: filter => user => {
    if (filter === '') return true;

    const username = user?.username
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    const id = user?.id
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    return id || username;
  }
});

const transformer = {
  id: (_, x) => x.id,
  username: (_, x) => x.username?.toLowerCase()
};

const table = selector({
  key: 'user.table',
  get: ({ get }) => {
    const page = get($user.page);
    const sort = get($user.sort);
    const filters = get($user.filters);

    const limit = 10;

    const data = get($user.list);

    const start = (page - 1) * limit;
    const end = start + limit;

    const items = applyFilter(
      data ?? [],
      Object.entries(filters).map(([key, value]) => ({ type: key, value })),
      searchCriteria
    ).sort(orderBy(sort.by, sort.direction, transformer[sort.by] ?? null));

    return {
      data: items.slice(start, end) || [],
      pagination: {
        page,
        limit,
        total: items.length,
        pages: Math.ceil(items.length / limit),
        count: data.length
      }
    };
  }
});

export default table;
