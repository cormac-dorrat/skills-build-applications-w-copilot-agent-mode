import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Promise.all([
      activity.deleteMany({}),
      leaderboard.deleteMany({}),
      team.deleteMany({}),
      workout.deleteMany({}),
      user.deleteMany({}),
    ]);

    const users = await user.insertMany([
      { username: 'ava.runner', email: 'ava.runner@example.com', displayName: 'Ava Patel' },
      { username: 'marcus.moves', email: 'marcus.moves@example.com', displayName: 'Marcus Chen' },
      { username: 'sofia.strong', email: 'sofia.strong@example.com', displayName: 'Sofia Garcia' },
      { username: 'liam.trails', email: 'liam.trails@example.com', displayName: 'Liam Johnson' },
    ]);

    const teams = await team.insertMany([
      {
        name: 'Dawn Patrol',
        description: 'Early risers building consistent cardio habits.',
        members: [users[0]._id, users[1]._id],
        createdBy: users[0]._id,
      },
      {
        name: 'Peak Performers',
        description: 'A balanced team focused on strength and endurance.',
        members: [users[2]._id, users[3]._id],
        createdBy: users[2]._id,
      },
    ]);

    const now = new Date();
    const periodStart = new Date(now);
    periodStart.setDate(periodStart.getDate() - 7);
    const periodEnd = now;

    await activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 35, distanceKm: 5.2, calories: 340, completedAt: new Date(now.getTime() - 86400000) },
      { user: users[1]._id, type: 'cycling', durationMinutes: 48, distanceKm: 16, calories: 410, completedAt: new Date(now.getTime() - 172800000) },
      { user: users[2]._id, type: 'strength', durationMinutes: 42, calories: 280, completedAt: new Date(now.getTime() - 259200000) },
      { user: users[3]._id, type: 'walking', durationMinutes: 55, distanceKm: 4.1, calories: 220, completedAt: new Date(now.getTime() - 345600000) },
    ]);

    await leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 320, rank: 1, periodStart, periodEnd },
      { user: users[2]._id, team: teams[1]._id, points: 285, rank: 2, periodStart, periodEnd },
      { user: users[1]._id, team: teams[0]._id, points: 240, rank: 3, periodStart, periodEnd },
      { user: users[3]._id, team: teams[1]._id, points: 190, rank: 4, periodStart, periodEnd },
    ]);

    await workout.insertMany([
      {
        name: 'Starter Run',
        description: 'An easy-paced session to build aerobic endurance.',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['5-minute warm-up walk', '20-minute easy run', '5-minute cool-down'],
      },
      {
        name: 'Full-body Basics',
        description: 'A simple strength session using bodyweight movements.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 35,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        name: 'Mobility Reset',
        description: 'Gentle mobility work for recovery after a training day.',
        category: 'recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'Hip flexor stretch', 'Thoracic rotations', 'Hamstring stretch'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
