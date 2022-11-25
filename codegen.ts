
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${process.env.HASURA_URL}/v1/graphql`]: {
      headers: {
        "X-Hasura-Admin-Secret": `${process.env.HASURA_ADMIN_SECRET}`
      }
    }
  },
  documents: "pages/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "./lib/generated/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
