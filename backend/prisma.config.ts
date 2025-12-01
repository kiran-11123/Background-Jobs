import 'dotenv/config';

export default {
  datasource: {
    db: {
      url: process.env.DATABASE_URL!, // Non-null assertion
    },
  },
  generator: {
    client: {
      provider: 'prisma-client',
      output: './src/generated/prisma',
    },
  },
};
