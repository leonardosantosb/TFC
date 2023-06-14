import Teams from '../database/models/teamsModelsSequelize';

export default class TeamsService {
  constructor(
    private teamsModel = Teams,
  ) {}

  public async findAll() {
    const teams = await this.teamsModel.findAll();
    console.log(teams);
    return { status: 200, data: teams };
  }
}
