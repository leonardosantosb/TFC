import Teams from '../database/models/teamsModelsSequelize';
import Matches from '../database/models/matchesModelsSequelize';
import TeamsService from './teamsService';

export default class MatchesService {
  constructor(
    private matchesModel = Matches,
  ) {}

  public async findAll() {
    const allMatches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
    });
    return { status: 200, data: allMatches };
  }

  public async matchesEnded(id: string) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return { status: 200, data: { message: 'Finished' } };
  }

  public async matchesScored(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    const changeScore = await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { status: 200, data: changeScore };
  }

  public async createMatches(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const teamsId = new TeamsService();
    const homeT = await teamsId.findOne(String(homeTeamId));
    const awayT = await teamsId.findOne(String(awayTeamId));
    if (!homeT.data || !awayT.data) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchesModel.create(
      {
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
      },
    );
    return { status: 201, data: newMatch };
  }
}
