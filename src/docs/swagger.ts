import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: `
        ### Todo API Documentation

        This is a RESTful service for managing todo items with secure JWT authentication.

        - **CRUD operations** on todo items
        - **JWT-based auth** for secure access
        - **Swagger UI** for API testing
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
        url: 'https://todo-backend-y42y.onrender.com',
        description: 'Production server (Render)',
      },
      {
        url: 'http://localhost:5000',
        description: 'Local server',
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
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Make sure routes are documented with Swagger annotations
});
