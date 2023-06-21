import LeaderBoards from '../Interfaces/leaderBoardsInterface';

export default class LeaderBoardsClass {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;

  constructor(n: string, lBInterface: LeaderBoards[]) {
    this.name = n;
    this.goalsFavor = LeaderBoardsClass.GoalsF(lBInterface);
    this.goalsOwn = LeaderBoardsClass.GoalsO(lBInterface);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.totalVictories = LeaderBoardsClass.Gains(lBInterface);
    this.totalDraws = LeaderBoardsClass.totalDraws(lBInterface);
    this.totalLosses = LeaderBoardsClass.totalLosses(lBInterface);
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
    this.totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    this.efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
  }

  private static GoalsF = (lBInterface: LeaderBoards[]) => {
    let goalsF = 0;
    lBInterface.forEach((element) => {
      goalsF += element.goalsFavor;
    });
    return goalsF;
  };

  private static GoalsO = (lBInterface: LeaderBoards[]) => {
    let goalsO = 0;
    lBInterface.forEach((element) => {
      goalsO += element.goalsOwn;
    });
    return goalsO;
  };

  private static Gains = (lBInterface: LeaderBoards[]) => {
    let gains = 0;
    lBInterface.forEach((element) => {
      if (element.goalsFavor > element.goalsOwn) {
        gains += 1;
      }
    });
    return gains;
  };

  private static totalDraws = (lBInterface: LeaderBoards[]) => {
    let totalDraws = 0;
    lBInterface.forEach((element) => {
      if (element.goalsFavor === element.goalsOwn) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private static totalLosses = (lBInterface: LeaderBoards[]) => {
    let totalLosses = 0;
    lBInterface.forEach((element) => {
      if (element.goalsFavor < element.goalsOwn) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  };
}
