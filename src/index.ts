import express from 'express';
import { connectDb } from './db/connection';
import { createRoute } from './routes/createRoute';
import { auth } from './routes/auth';
import { episode } from './routes/episode';
import { gener } from './routes/gener';
import { serie } from './routes/serie';
import { user } from './routes/user';
import { corsOrigin } from './middlewares';
import './utils/authStrategies';

const app = express();

//db connection
connectDb();

// middlewares
app.use(corsOrigin());
app.use(express.json());

// routes
createRoute(app, serie);
createRoute(app, episode);
createRoute(app, gener);
createRoute(app, auth);
createRoute(app, user);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
