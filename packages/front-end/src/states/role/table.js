import { selector } from 'recoil';

import { $role } from 'states';
import { applyFilter, orderBy } from 'helpers';

const searchCriteria = Object.entries({
  search: filter => role => {
    if (filter === '') return true;

    const type = role?.type
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    const id = role?.id
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    return id || type;
  }
});

const transformer = {
  id: (_, x) => x.id,
  rolename: (_, x) => x.rolename?.toLowerCase()
};

const table = selector({
  key: 'role.table',
  get: ({ get }) => {
    const page = get($role.page);
    const sort = get($role.sort);
    const filters = get($role.filters);

    const limit = 10;

    const data = get($role.list);

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
