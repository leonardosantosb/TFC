import LeaderBoardsClass from '../utils/leaderBoardsRegras';
import MatchesModel from '../database/models/matchesModelsSequelize';
import TeamsModel from '../database/models/teamsModelsSequelize';

export default class LeaderBoards {
  private _matchesModel = MatchesModel;
  private regras: LeaderBoardsClass[] = [];
  private _teamsModel = TeamsModel;

  public async allMatches() {
    const matches = await this._matchesModel.findAll();
    const teams = await this._teamsModel.findAll();

    teams.forEach((team) => {
      const matchesTeam = matches.filter((match) => match.inProgress === false
      && match.homeTeamId === team.id);

      const map = matchesTeam.filter((match) => match.homeTeamGoals + match.awayTeamGoals);

      const namesLeader = new LeaderBoardsClass(team.teamName, map as any);
      this.regras.push(namesLeader);
    });
    return { status: 200, data: this.regras };
  }
}
