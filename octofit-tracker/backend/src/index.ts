import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import { activity } from './models/activity.js';
import { leaderboard } from './models/leaderboard.js';
import { team } from './models/team.js';
import { user } from './models/user.js';
import { workout } from './models/workout.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const listDocuments =
  (findDocuments: () => Promise<unknown>): RequestHandler =>
  async (_request, response) => {
    response.json(await findDocuments());
  };

app.get('/api/users/', listDocuments(() => user.find().lean()));
app.get('/api/teams/', listDocuments(() => team.find().populate('members', 'username displayName').lean()));
app.get('/api/activities/', listDocuments(() => activity.find().populate('user', 'username displayName').lean()));
app.get('/api/leaderboard/', listDocuments(() => leaderboard.find().populate('user', 'username displayName').populate('team', 'name').sort({ rank: 1 }).lean()));
app.get('/api/workouts/', listDocuments(() => workout.find().lean()));

const handleApiError: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleApiError);

export default app;
