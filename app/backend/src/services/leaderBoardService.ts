import LeaderBoardsClass from '../utils/leaderBoardsRegras';
import MatchesModel from '../database/models/matchesModelsSequelize';
import TeamsModel from '../database/models/teamsModelsSequelize';

export default class LeaderBoards {
  private _matchesModel = MatchesModel;
  private _teamsModel = TeamsModel;
  private _return: LeaderBoardsClass[] = [];
  private isProcessed = false;

  public ordenacao() {
    this._return.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      } if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsOwn - a.goalsOwn;
    });
  }

  public async allMatches() {
    if (this.isProcessed) {
      return { status: 200, data: this._return };
    }
    const matches = await this._matchesModel.findAll();
    const teams = await this._teamsModel.findAll();
    teams.forEach((team) => {
      const ft = matches.filter((match) => match.inProgress === false
      && match.homeTeamId === team.dataValues.id);

      const map = ft.map((goals) => ({ goalsFavor: goals.dataValues.homeTeamGoals,
        goalsOwn: goals.dataValues.awayTeamGoals }));

      this._return.push(new LeaderBoardsClass(team.teamName, map as any));
    });
    this.ordenacao();
    this.isProcessed = true;

    return { status: 200, data: this._return };
  }
}
