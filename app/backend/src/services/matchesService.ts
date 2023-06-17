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
}
