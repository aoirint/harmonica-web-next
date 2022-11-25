import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTimezone from 'dayjs/plugin/timezone'

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getToken } from '../lib/auth'

// Setup dayjs
dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTimezone)

// Setup Apollo client
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_HASURA_URL}/v1/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
