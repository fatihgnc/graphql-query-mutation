import http from 'http';
import cors from 'cors';
import express from 'express';
import { readFile } from 'fs/promises';

// Imports for GraphQL (Apollo server stuff)
import { ApolloServer } from '@apollo/server';
import { resolvers } from './graphql/resolvers.js';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const app = express();
const httpServer = http.createServer(app);
// Read schema
const typeDefs = await readFile('./graphql/schema.graphql', 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start apollo server
await server.start();

// Set up GraphQL endpoint
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Start http server
httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
