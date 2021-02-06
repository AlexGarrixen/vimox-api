import express from 'express';
import { connectDb } from './db';
import { createRoute, serie } from './routes';
import { corsOrigin } from './middlewares';

const app = express();

//db connection
connectDb();

// middlewares
app.use(corsOrigin());
app.use(express.json());

// routes
createRoute(app, serie);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
