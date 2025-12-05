import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${process.env.NEXT_PUBLIC_HASURA_URL}/v1/graphql`]: {
      headers: {
        "X-Hasura-Admin-Secret": `${process.env.HASURA_ADMIN_SECRET}`,
      },
    },
  },
  documents: "src/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
}

export default config
