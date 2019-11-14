const Router = require('express/lib/router');
const BatchController = require('./batch-controller');
const AppRouter = Router();

AppRouter.post('/batch', BatchController.handleBatch);

module.exports = AppRouter;
