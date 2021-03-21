import express from 'express';
import { connectDb } from './db';
import { createRoute, serie, episode, gener, auth } from './routes';
import { corsOrigin } from './middlewares';
import './shared/utils/authStrategies';

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

const port = process.env.PORT || 5001;

app.listen(port, () => {
	console.info(`Server listening on port ${port}`);
});
