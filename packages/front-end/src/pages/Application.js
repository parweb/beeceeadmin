import { Suspense } from 'react';

import {
  Flex,
  Spacer,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

import { useParams } from 'hooks';
import { Spinner } from 'layout';

import {
  BcaconnectHome,
  BcagdocHome,
  BcasignHome,
  EnvironnementList
} from 'application';

const applications = {
  bcagdoc: BcagdocHome,
  bcaconnect: BcaconnectHome,
  bcasign: BcasignHome
};

const Application = props => {
  const params = useParams();
  const Component = applications[params.application];

  const breadcrumbs = Object.entries(params);

  return (
    <>
      <Flex p={2} bg="white" borderWidth="1px">
        <Center>
          <Breadcrumb>
            {breadcrumbs.map(([key, value], i) => (
              <BreadcrumbItem
                key={`BreadcrumbItem-${key}`}
                isCurrentPage={breadcrumbs.length === i + 1}
              >
                <BreadcrumbLink>{value}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Center>

        <Spacer />

        <Center>
          <EnvironnementList />
        </Center>
      </Flex>

      <Suspense fallback={<Spinner />}>
        <Component />
      </Suspense>
    </>
  );
};

export default Application;
