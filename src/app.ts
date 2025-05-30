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

const allowedOrigins = [
  'https://zen-tasks-fe.vercel.app',
  'http://localhost:8081',
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Versioned REST API
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Swagger Docs (version-neutral)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// GraphQL endpoint (versioned)
app.use(
  '/api/v1/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

export default app;
