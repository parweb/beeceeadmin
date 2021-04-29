// import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
// import styled from 'styled-components';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

// import { Grid, Sidebar, Main } from 'layout';
// import { BcasignClientList, BcasignClientEditor } from 'application';
import { $client } from 'states';
import { useParams } from 'hooks';

const ClientEditor = () => {
  const { id } = useParams();
  const client = useRecoilValue($client.read(id));

  if (!id) return null;

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>

          <TabPanel>
            <p>two!</p>
          </TabPanel>

          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <pre>{JSON.stringify(client, null, 2)}</pre>
    </>
  );
};

export default ClientEditor;
