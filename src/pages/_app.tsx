import '@/styles/globals.css';
import SearchContextProvider from '@/contexts/SearchContext';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { find } from 'lodash';

//Apollo cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        questions: {
          keyArgs: false,
          merge(existing = [], incoming){
            let q = null;
            if(incoming.length>0)
             q = find(existing, incoming[0]);
            if(q)
              return existing;
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
});

//Apollo client set up
const client = new ApolloClient({
  uri: 'http://localhost:4100/graphql',
  cache
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
        <SearchContextProvider>
          <Component {...pageProps} />
        </SearchContextProvider>
    </ApolloProvider>
  );
}
