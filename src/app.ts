import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import taskRoutes from './routes/taskRoutes';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ['https://zen-tasks-fe.vercel.app', 'http://localhost:8081'],
    credentials: true,
  })
);

app.use(express.json());

// Versioned REST API
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Swagger Docs (version-neutral)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// GraphQL endpoint
app.use(
  '/api/v1/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

export default app;
