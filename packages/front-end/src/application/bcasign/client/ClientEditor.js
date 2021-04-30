import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  IconButton
} from '@chakra-ui/react';

import { $client } from 'states';
import { useParams } from 'hooks';
import { Input } from 'layout';
import { BcasignNotificationList, BcasignPositionList } from 'application';

const ClientEditor = () => {
  const { id } = useParams();
  const client = useRecoilValue($client.read(id));
  const { register } = useForm();

  if (!id) return null;

  return (
    <>
      <form>
        <Input placeholder="id" {...register('id')} />
        <Input
          placeholder="signedDocPattern"
          {...register('signedDocPattern')}
        />
      </form>

      <Tabs>
        <TabList>
          <Tab>notifications</Tab>
          <Tab>positions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <BcasignNotificationList clientId={id} />
          </TabPanel>

          <TabPanel>
            <BcasignPositionList clientId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <pre>{JSON.stringify(client, null, 2)}</pre>
    </>
  );
};

export default ClientEditor;
