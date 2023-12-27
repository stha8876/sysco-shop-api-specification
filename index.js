const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Initialize Express app
const app = express();
const PORT = 3000;
const VERSION = "v1";

// Swagger definition and setup to combine YAML files
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sysco Shop",
      version: "1.0.0",
      description:
        "API Documentation for Sysco Shop B2B E-Commerce Platform - Batch 11",
      contact: {
        name: "Project Summit",
        url: "https://opensource.org/licenses/MIT",
        email: "Test@icloud.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
      {
        url: "http://localhost:8000",
        description: "Production server",
      },
    ],
  },
  apis: [`./docs/${VERSION}/swagger.yaml`],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use express.json() to parse JSON payloads
app.use(express.json());

// A simple test route for LandingPage
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app; // Export for potential testing purposes
