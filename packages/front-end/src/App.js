import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IconSettings } from '@salesforce/design-system-react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';

import { PrivateRoute, Login, Home, Page, Application } from 'pages';

import { Spinner } from 'layout';
import theme from 'theme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API + '/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route>
              <IconSettings iconPath={process.env.PUBLIC_URL + '/icons'}>
                <Page>
                  <Suspense fallback={<Spinner />}>
                    <Route exact path="/auth/login" component={Login} />

                    <PrivateRoute exact path="/">
                      <Home />
                    </PrivateRoute>

                    <PrivateRoute path="/application/:application/:section/:id?">
                      <Application />
                    </PrivateRoute>

                    {/*<Route
                      path="/application/:application/:section/:id?"
                      component={Application}
                    />*/}
                  </Suspense>
                </Page>
              </IconSettings>
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  </ApolloProvider>
);

export default App;
