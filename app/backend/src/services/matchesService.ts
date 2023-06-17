import Teams from '../database/models/teamsModelsSequelize';
import Matches from '../database/models/matchesModelsSequelize';

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
}
