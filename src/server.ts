import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import {
  ApolloServer,
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { buildSchema } from 'type-graphql';

const PORT = process.env.PORT || 5000;
const GQLPATH = '/graphql';

const main = async () => {
  const sequelize = new Sequelize({
    database: process.env.DB_DATABASE!,
    dialect: 'mysql',
    host: process.env.DB_HOST!,
    modelPaths: [`${__dirname}/models`],
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER!,
  });

  sequelize.sync({
    // force: true,
  });

  const schema = await buildSchema({
    emitSchemaFile: path.resolve(__dirname, '..', 'schema', 'schema.gql'),
    // .js instead of .ts because ts will transpile into js
    resolvers: [`${__dirname}/controllers/*.resolver.js`],
  });

  const app = express();

  const server = new ApolloServer({
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: GQLPATH });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // tslint:disable-next-line: no-console
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};

main();
