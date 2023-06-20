const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamgGals: 1,
    inProgress: false,
  },
];

const matchesEnded = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  }];

const createMatches = [
  {
    id: 4,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: true,
  },
];

const create = {
  homeTeamId: 4,
  homeTeamGoals: 3,
  awayTeamId: 11,
  awayTeamGoals: 0,
};
const createError = {
  homeTeamGoals: 3,
  awayTeamId: 11,
  awayTeamGoals: 0,
};

export default {
  allMatches,
  matchesEnded,
  createMatches,
  create,
  createError,
};
