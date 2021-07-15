import { selector } from 'recoil';

import { $permission } from 'states';
import { applyFilter, orderBy } from 'helpers';

const searchCriteria = Object.entries({
  search: filter => permission => {
    if (filter === '') return true;

    const type = permission?.type
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    const id = permission?.id
      ?.toString()
      ?.toLowerCase()
      ?.includes(filter.toLowerCase());

    return id || type;
  }
});

const transformer = {
  id: (_, x) => x.id,
  permissionname: (_, x) => x.permissionname?.toLowerCase()
};

const table = selector({
  key: 'permission.table',
  get: ({ get }) => {
    const page = get($permission.page);
    const sort = get($permission.sort);
    const filters = get($permission.filters);

    const limit = 10;

    const data = get($permission.list);

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
