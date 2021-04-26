import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { VerticalNavigation } from '@salesforce/design-system-react';

const sampleReportCategories = [
  {
    id: 'menu-admin',
    label: 'Menu',
    items: [
      {
        id: 'rule-extension',
        href: '/admin/extensions',
        label: 'Règles extentions'
      },
      {
        id: 'code-courrier',
        href: '/admin/courriers',
        label: 'Codes courriers'
      }
    ]
  }
];

const Menu = () => {
  const history = useHistory();
  const [selectedId, setSelectedId] = useState('recent_reports');

  return (
    <VerticalNavigation
      id="menu-primary"
      categories={sampleReportCategories}
      selectedId={selectedId}
      onSelect={(event, { item }) => {
        setSelectedId(item.id);

        history.push(item.href);
      }}
    />
  );
};

export default Menu;
