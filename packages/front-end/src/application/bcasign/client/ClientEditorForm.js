import { useRecoilValue } from 'recoil';
import produce from 'immer';

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
import { useParams, useMutation, useAccess } from 'hooks';
import { Input } from 'layout';

import {
  BcasignNotificationList,
  BcasignPositionList,
  BcasignClientEssentials
} from 'application';

const ClientEditorForm = () => {
  const can = useAccess();

  const { id } = useParams();
  const client = useRecoilValue($client.read(id));
  const [updateClient] = useMutation($client.update(id));

  const hasClientEssentials =
    client?.callbackChannels?.length === 4 &&
    client?.callbackChannels
      .map(({ code }) => code)
      .sort()
      .join('-') === 'DOC_NUM-GE-GE-XPS';

  const onChange = e => {
    const { value, name } = e.target;

    updateClient(
      produce(client, draft => {
        if (name === 'id') draft[name] = value;
        if (name === 'signedDocPattern') draft[name] = value;
      })
    );
  };

  if (!id) return null;

  return (
    <>
      <Box p={2}>
        <FormControl id="id">
          <FormLabel>id</FormLabel>
          <Input
            disabled={!can('client.edit')}
            id="id"
            name="id"
            placeholder="id"
            value={client.id}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="signedDocPattern">
          <FormLabel>signedDocPattern</FormLabel>
          <Input
            disabled={!can('client.edit')}
            id="signedDocPattern"
            name="signedDocPattern"
            placeholder="signedDocPattern"
            value={client.signedDocPattern}
            onChange={onChange}
          />
        </FormControl>
      </Box>

      <Tabs>
        <TabList>
          <Tab>notifications</Tab>
          <Tab>positions</Tab>
          {hasClientEssentials && <Tab>édition rapide</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <BcasignNotificationList clientId={id} />
          </TabPanel>

          <TabPanel>
            <BcasignPositionList clientId={id} />
          </TabPanel>

          {hasClientEssentials && (
            <TabPanel>
              <BcasignClientEssentials clientId={id} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ClientEditorForm;
