import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { SearchIcon } from '@chakra-ui/icons';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react';

import { $permission } from 'states';
import { BcaconnectPermissionItem, BcaconnectPermissionAdd } from 'application';
import { range } from 'helpers';
import { ButtonGroup } from 'layout';
import { useAccess } from 'hooks';

const nextPage = (array, position) => array[position - 1 + 1] ?? array[0];
const prevPage = (array, position) =>
  array[position - 1 - 1] ?? array[array.length - 1];

const getPagination = (pageNumbers, currentPage, max) => {
  let start = currentPage - 1 - Math.floor(max / 2);
  let end = currentPage - 1 + Math.ceil(max / 2);

  start = start < 0 ? 0 : start;
  end = start === 0 ? max : end;

  let pages = pageNumbers.slice(start, end);
  pages = pages.length < max ? pageNumbers.slice(-max) : pages;

  return pages;
};

const Pagination = ({ max = 5 }) => {
  const [currentPage, setCurrentPage] = useRecoilState($permission.page);
  const { pagination } = useRecoilValue($permission.table);

  const pageNumbers = range(pagination.pages);
  const pages = getPagination(pageNumbers, currentPage, max);

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          borderWidth: '1px',
          borderColor: 'transparent',
          paddingTop: 'var(--chakra-space-1)',
          paddingBottom: 'var(--chakra-space-1)',
          paddingLeft: 'var(--chakra-space-3)',
          paddingRight: 'var(--chakra-space-3)'
        }}
        id="previous-btn"
        onClick={() => {
          setCurrentPage(prevPage(pageNumbers, currentPage));
        }}
        disabled={currentPage === 1}
      >
        «
      </div>

      <ButtonGroup
        name="pageNumbers"
        options={pages.map(i => i.toString())}
        value={currentPage.toString()}
        onChange={page => setCurrentPage(parseInt(page))}
      />

      <div
        style={{
          cursor: 'pointer',
          borderWidth: '1px',
          borderColor: 'transparent',
          paddingTop: 'var(--chakra-space-1)',
          paddingBottom: 'var(--chakra-space-1)',
          paddingLeft: 'var(--chakra-space-3)',
          paddingRight: 'var(--chakra-space-3)'
        }}
        id="next-btn"
        onClick={() => {
          setCurrentPage(nextPage(pageNumbers, currentPage));
        }}
        disabled={currentPage === pageNumbers.length}
      >
        »
      </div>
    </div>
  );
};

const Search = () => {
  const can = useAccess();

  const [filters, setFilters] = useRecoilState($permission.filters);
  const setCurrentPage = useSetRecoilState($permission.page);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, setCurrentPage]);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          id="search-input"
          type="text"
          placeholder="Recherche ..."
          value={filters.search}
          onChange={e => setFilters(state => ({ search: e.target.value }))}
        />
      </InputGroup>

      {can('permission.add') && <BcaconnectPermissionAdd />}
    </div>
  );
};

const PermissionList = () => {
  const permissions = useRecoilValue($permission.table);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        padding: '10px',
        gap: '10px'
      }}
    >
      <Search />

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nom</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {permissions.data.map(permission => (
            <BcaconnectPermissionItem
              key={`BcaconnectPermissionItem-${permission.id}`}
              id={permission.id}
            />
          ))}
        </Tbody>
      </Table>

      <Pagination />
    </div>
  );
};

export default PermissionList;
