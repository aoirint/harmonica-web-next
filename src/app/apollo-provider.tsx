"use client"

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { type ReactNode, useMemo } from "react"
import { getToken } from "@/lib/auth"

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_HASURA_URL}/v1/graphql`,
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export interface ApolloProviderClientProps {
  children: ReactNode
}

export default function ApolloProviderClient({
  children,
}: ApolloProviderClientProps) {
  const client = useMemo(() => createApolloClient(), [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
