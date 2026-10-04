# OctoFit Tracker: a quick guide for new joiners

Welcome! This project is a fitness tracking app for Mergington High School. The goal is simple: help students log exercise, stay motivated, and compare progress with teammates in a friendly, encouraging way.

It is built as a small multi-tier app:

- Frontend: React app with a browser UI
- Backend: Express API with TypeScript
- Data layer: MongoDB database

The app is designed around a few core ideas:

- People can create a profile and track activities like running, walking, cycling, and strength training
- Students can join teams and work together toward goals
- A leaderboard shows who is leading over a time period
- Workout suggestions can help people stay active in a way that fits their level

## What the app is trying to do

At a high level, OctoFit Tracker helps turn exercise into something visible, social, and motivating.

Instead of just keeping track in a notebook, the app stores activity in a database and turns it into a dashboard that can show:

- who completed what workout
- how long they trained
- how far they went
- which team they are on
- where they sit on the leaderboard

This makes it easier for a teacher or coach to understand progress without doing everything manually.

## How it is structured

### 1. Frontend: the user-facing app

The frontend lives in `octofit-tracker/frontend` and uses React + Vite.

This part is responsible for:

- showing pages to the user
- collecting data from the browser
- calling the backend API
- rendering lists, scores, and workout information

The main app logic is centered in files such as:

- `octofit-tracker/frontend/src/App.jsx`
- `octofit-tracker/frontend/src/main.jsx`

A browser user usually sees a dashboard or interface that pulls data from the API and displays it in a friendly layout.

### 2. Backend: the application logic

The backend lives in `octofit-tracker/backend` and uses Node.js with Express and TypeScript.

This is where the app logic lives. It exposes API routes under `/api` so the frontend can request information from the server.

Examples in the project include:

- `/api/health` to check if the service is running
- `/api/users/` to fetch users
- `/api/teams/` to fetch team information
- `/api/activities/` to fetch activity logs
- `/api/leaderboard/` to fetch ranking data
- `/api/workouts/` to fetch workout suggestions

The main API entry point is:

- `octofit-tracker/backend/src/server.ts`
- `octofit-tracker/backend/src/index.ts`

These files create the Express app, load the routes, and start the service on port 8000.

### 3. Data layer: MongoDB and Mongoose

The project uses MongoDB as its database, with Mongoose to model the data.

Each data model maps to a type of information the app needs:

- `User`: a person using the app
- `Team`: a group of users
- `Activity`: a logged workout or exercise session
- `Leaderboard`: a ranking entry for a user or team over a time period
- `Workout`: a recommended or available fitness session

You can find these in:

- `octofit-tracker/backend/src/models/user.ts`
- `octofit-tracker/backend/src/models/team.ts`
- `octofit-tracker/backend/src/models/activity.ts`
- `octofit-tracker/backend/src/models/leaderboard.ts`
- `octofit-tracker/backend/src/models/workout.ts`

The database connection is handled in:

- `octofit-tracker/backend/src/config/database.ts`

That file tells the app where MongoDB is running and connects the app to it.

## How data moves through the app

A typical request looks like this:

1. A user opens the frontend in the browser.
2. The React app requests data from the backend, for example `/api/leaderboard`.
3. Express receives the request.
4. The backend asks MongoDB for the relevant records using Mongoose models.
5. MongoDB returns the data as documents.
6. Express sends the data back as JSON.
7. React displays it on the page.

So the app follows a very common pattern:

Browser UI -> API -> database -> API response -> UI update

This is an easy pattern to understand once you see it in action: the database stores the real information, the API exposes it, and the UI turns it into something people can use.

## Example data in the project

The project includes a seed script that adds sample records to the database:

- sample users
- sample teams
- sample activities
- leaderboard entries
- workout suggestions

This is useful because it gives the app realistic content immediately and makes it easier to test the frontend and API together.

See:

- `octofit-tracker/backend/src/scripts/seed.ts`

The seed script clears the database and inserts a small set of example content so you can explore the app without starting from scratch.

## A simple mental model

If you are still learning, think of the app like this:

- The frontend is the shop window: it shows information and lets users interact
- The backend is the manager behind the scenes: it handles requests and business logic
- MongoDB is the storage cupboard: it keeps all the real data safe and organized

## Where to start as a junior developer

If you are new to the project, a good order is:

1. Read the backend routes in `server.ts` and `index.ts`
2. Look at the Mongoose models to understand the data structure
3. Check the seed script to see example data and how records are shaped
4. Open the frontend app to understand how the data is shown to users

That gives you a clear picture of the app without needing to understand every file at once.

## In one sentence

OctoFit Tracker is a fitness app that helps students log exercise, join teams, and compete in a friendly leaderboard, all powered by a React frontend, an Express API, and a MongoDB database.

If you are learning this stack for the first time, the key idea is that each layer has one job:

- React shows the app
- Express connects the app to the data
- MongoDB stores the actual records

That is the heart of how this project works.
