import { Suspense } from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IconSettings, Spinner } from '@salesforce/design-system-react';
import { RecoilRoot } from 'recoil';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import {
  PrivateRoute,
  Login,
  Home,
  Documents,
  Mission,
  Page,
  AdminHome,
  AdminExtensions,
  AdminCourriers
} from 'components/page';

const theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: '360px',
    md: '768px',
    lg: '1024px',
    xl: '1440px'
  })
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_API + '/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Suspense
          fallback={
            <Spinner
              size="small"
              variant="base"
              assistiveText={{ label: 'Recherche en cours' }}
            />
          }
        >
          <IconSettings iconPath={process.env.PUBLIC_URL + '/icons'}>
            <Page>
              <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                  <Route>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/mission/:idMiss" component={Mission} />
                    <Route exact path="/login" component={Login} />

                    <Route
                      exact
                      path="/mission/:idMiss/document/:idDoc/:advanced?"
                      component={Mission}
                    />

                    <PrivateRoute exact path="/documents">
                      <Documents />
                    </PrivateRoute>

                    <PrivateRoute exact path="/admin">
                      <AdminHome />
                    </PrivateRoute>

                    <PrivateRoute exact path="/admin/extensions">
                      <AdminExtensions />
                    </PrivateRoute>

                    <PrivateRoute exact path="/admin/courriers">
                      <AdminCourriers />
                    </PrivateRoute>
                  </Route>
                </Switch>
              </Router>
            </Page>
          </IconSettings>
        </Suspense>
      </ChakraProvider>
    </RecoilRoot>
  </ApolloProvider>
);

export default App;
