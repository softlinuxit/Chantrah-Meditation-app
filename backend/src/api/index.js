const express = require('express');
const cors = require('cors');
const app = express();
const authMiddleware = require('../auth/authMiddleware');
const {
  init: databaseInit,
  middleware: databaseMiddleware,
} = require('../database/databaseInit');
const path = require('path');
const fs = require('fs');

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
databaseInit().catch((error) => console.error(error));
app.use(databaseMiddleware);

// to set the currentUser to the requests
app.use(authMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure the Entity routes
const routes = express.Router();
require('./auditLog')(routes);
require('./auth')(routes);
require('./file')(routes);
require('./iam')(routes);
require('./settings')(routes);
require('./appUsers')(routes);
require('./posts')(routes);
require('./comments')(routes);

// Add the routes to the /api endpoint
app.use('/api', routes);

// Exposes the build of the frontend
// to the root / of the server
const frontendDir = path.join(
  __dirname,
  '../../../frontend/build',
);

if (fs.existsSync(frontendDir)) {
  app.use('/', express.static(frontendDir));

  app.get('*', function (request, response) {
    response.sendFile(
      path.resolve(frontendDir, 'index.html'),
    );
  });
}

module.exports = app;
