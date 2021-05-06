import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

import { $client } from 'states';
import { useParams } from 'hooks';
import { Input } from 'layout';
import { BcasignNotificationList, BcasignPositionList } from 'application';

const ClientEditorForm = () => {
  const { id } = useParams();
  const client = useRecoilValue($client.read(id));
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const onSubmit = console.log;

  if (!id) return null;

  return (
    <>
      <form style={{ padding: '0.5rem' }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="id">
          <FormLabel>id</FormLabel>
          <Input
            id="id"
            placeholder="id"
            defaultValue={client.id}
            {...register('id')}
          />
        </FormControl>

        <FormControl id="signedDocPattern">
          <FormLabel>signedDocPattern</FormLabel>
          <Input
            id="signedDocPattern"
            placeholder="signedDocPattern"
            defaultValue={client.signedDocPattern}
            {...register('signedDocPattern')}
          />
        </FormControl>

        <button type="submit">ok</button>
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
    </>
  );
};

export default ClientEditorForm;
