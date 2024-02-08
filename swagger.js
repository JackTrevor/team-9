const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'News Aggregator API',
    description: 'News Aggregator API containing relevant news from different news publishers and their journalists.'
  },
  // host: 'news-v00i.onrender.com',
  host: 'localhost:3000',
  // schemes: ['https']
  schemes: ['http']
 
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen(outputFile, routes, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, routes, doc).then(async () => {
  await import('./server.js');
});