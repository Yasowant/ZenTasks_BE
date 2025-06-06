import express from 'express';
import cors from 'cors';

import { graphqlHTTP } from 'express-graphql';
import swaggerUi from 'swagger-ui-express';

import todoRoutes from './routes/todoRoutes';
import taskRoutes from './routes/taskRoutes';
import paymentRoutes from './routes/paymentRoutes';
import groupRoutes from './routes/groupRoutes';
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { swaggerSpec } from './docs/swagger';

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      'https://zen-tasks-fe.vercel.app',
      'http://localhost:8081',
      "http://localhost:8080",
      'https://zen-task-front-end.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Correct usage — registering routers
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/groups', groupRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// GraphQL API
app.use(
  '/api/v1/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

export default app;
