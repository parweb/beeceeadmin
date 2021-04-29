import { useRecoilValue } from 'recoil';
import { AddIcon } from '@chakra-ui/icons';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th
} from '@chakra-ui/react';

import { useMutation } from 'hooks';
import { ServiceItem } from 'application';
import { $environnement, $service } from 'states';
import { Button } from 'layout';

const EnvironnementModal = () => {
  const environnements = useRecoilValue($environnement.list);
  const [createService] = useMutation($service.create);

  return (
    <Tabs>
      <TabList>
        {environnements.map(({ id, name }) => (
          <Tab key={`EnvironnementModalTab-${id}`}>{name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {environnements.map(({ id, name, services }) => (
          <TabPanel key={`EnvironnementModalTabPanel-${id}`}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>nom</Th>
                  <Th>url</Th>
                </Tr>
              </Thead>

              <Tbody>
                {services.map(service => (
                  <ServiceItem
                    key={`ServiceItem-${service.id}`}
                    id={service.id}
                  />
                ))}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th>
                    <Button
                      onClick={() =>
                        createService({
                          name: '',
                          url: '',
                          environnement: id
                        })
                      }
                      leftIcon={<AddIcon />}
                    >
                      Ajouter un service
                    </Button>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default EnvironnementModal;
