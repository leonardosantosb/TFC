/* eslint-disable @typescript-eslint/naming-convention */
const allMatches = [
  {
    id: 1,
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    id: 2,
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: false,
  },
];

const matchesEnded = [
  {
    id: 3,
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  }];

const createMatches = [
  {
    home_team_id: 4,
    home_team_goals: 3,
    away_team_id: 11,
    away_team_goals: 0,
    in_progress: true,
  },
];

export default {
  allMatches,
  matchesEnded,
  createMatches,
};
