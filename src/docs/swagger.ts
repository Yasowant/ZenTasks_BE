import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ZenTasks',
      version: '1.0.0',
      description: `
### API Documentation

This project includes:
- **Todo RESTful API** with JWT-based authentication and Redis caching
- **Project and Task management** integrated within the Todo API
- **MongoDB** integration using Mongoose for data persistence
- **GraphQL API** for user authentication and profile operations
- **Swagger UI** for interactive API documentation and testing
- **Modular folder structure** with controllers, services, models, middlewares, and routes
- **Protected routes** secured with JWT-based auth middleware
`,
      contact: {
        name: 'Yasowant Nayak',
        email: 'yasowant@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
      {
        url: 'https://todo-backend-y42y.onrender.com',
        description: 'Production server (Render)',
      },
    ],
    tags: [
      {
        name: 'GraphQL',
        description:
          'GraphQL operations like login, register, getUser, updateUser, logout',
      },
      {
        name: 'Todos',
        description: 'Todo RESTful API endpoints (CRUD)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token as: Bearer <token>',
        },
      },
      schemas: {
        AuthPayload: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            refreshToken: { type: 'string' },
          },
          required: ['token', 'refreshToken'],
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
          required: ['id', 'name', 'email'],
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      '/api/v1/graphql': {
        post: {
          tags: ['GraphQL'],
          summary: 'GraphQL endpoint',
          description:
            'Send GraphQL queries and mutations for user login, registration, profile update, and logout.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    query: {
                      type: 'string',
                      description: 'GraphQL query or mutation string',
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables for the GraphQL operation',
                    },
                  },
                  required: ['query'],
                },
                examples: {
                  Login: {
                    summary: 'Login a user',
                    value: {
                      query: `
                        mutation Login($email: String!, $password: String!) {
                          login(email: $email, password: $password) {
                            token
                            refreshToken
                          }
                        }
                      `,
                      variables: {
                        email: 'test@example.com',
                        password: 'examplePassword123!',
                      },
                    },
                  },
                  Register: {
                    summary: 'Register a user',
                    value: {
                      query: `
                        mutation Register($name: String!, $email: String!, $password: String!) {
                          register(name: $name, email: $email, password: $password) {
                            id
                            name
                            email
                          }
                        }
                      `,
                      variables: {
                        name: 'John Doe',
                        email: 'john@example.com',
                        password: 'password123',
                      },
                    },
                  },
                  GetUser: {
                    summary: 'Get user by ID',
                    value: {
                      query: `
                        query GetUser($id: ID!) {
                          getUser(id: $id) {
                            id
                            name
                            email
                          }
                        }
                      `,
                      variables: {
                        id: 'user_id_here',
                      },
                    },
                  },
                  UpdateUser: {
                    summary: 'Update user',
                    value: {
                      query: `
                        mutation UpdateUser($id: ID!, $name: String, $email: String) {
                          updateUser(id: $id, name: $name, email: $email) {
                            id
                            name
                            email
                          }
                        }
                      `,
                      variables: {
                        id: 'user_id_here',
                        name: 'New Name',
                        email: 'newemail@example.com',
                      },
                    },
                  },
                  Logout: {
                    summary: 'Logout a user',
                    value: {
                      query: `
                        mutation Logout($refreshToken: String!) {
                          logout(refreshToken: $refreshToken)
                        }
                      `,
                      variables: {
                        refreshToken: 'refresh_token_here',
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful GraphQL response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: { type: 'object' },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            message: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': { description: 'Invalid GraphQL request' },
            '401': { description: 'Unauthorized access' },
          },
          security: [{ bearerAuth: [] }],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Adjust path according to your project structure
});
