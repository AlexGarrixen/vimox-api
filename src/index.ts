import express from 'express';
import { connectDb } from './db/connection';
import { createRoutes } from './routes/createRoutes';
import { auth } from './routes/auth';
import { episode } from './routes/episode';
import { gener } from './routes/gener';
import { serie } from './routes/serie';
import { user } from './routes/user';
import { search } from './routes/search';
import { types } from './routes/types';
import { corsOrigin, errorHandlers, notFound } from './middlewares';
import './utils/authStrategies';

const app = express();

//db connection
connectDb();

// middlewares
app.use(corsOrigin());
app.use(express.json());

// routes
createRoutes('/series', serie, app);
createRoutes('/episodes', episode, app);
createRoutes('/geners', gener, app);
createRoutes('/auth', auth, app);
createRoutes('/user', user, app);
createRoutes('/search', search, app);
createRoutes('/types', types, app);

//error handlers
app.use(errorHandlers.errorBoomImplementation);
app.use(errorHandlers.errorHandler);

//404
app.use(notFound);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
