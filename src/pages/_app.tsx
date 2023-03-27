import '@/styles/globals.css';
import UserContextProvider from '@/contexts/UserContext';
import SearchContextProvider from '@/contexts/SearchContext';
import users from '../data/users';
import questions from '../data/questions';
import answers from '../data/answers';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

//Apollo cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        questions: {
          keyArgs: false,
          merge(existing = [], incoming){
            console.log(existing, 'kl', incoming);
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
  useEffect(() => {
    window.localStorage.setItem(
      'users',
      JSON.stringify(Array.from(users.entries()))
    );
    window.localStorage.setItem(
      'answers',
      JSON.stringify(Array.from(answers.entries()))
    );
    window.localStorage.setItem(
      'questions',
      JSON.stringify(Array.from(questions.entries()))
    );
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <SearchContextProvider>
          <Component {...pageProps} />
        </SearchContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
}
