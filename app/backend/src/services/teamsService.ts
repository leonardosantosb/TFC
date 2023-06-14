import Teams from '../database/models/teamsModelsSequelize';

export default class TeamsService {
  constructor(
    private teamsModel = Teams,
  ) {}

  public async findAll() {
    const teams = await this.teamsModel.findAll();
    return { status: 200, data: teams };
  }

  public async findOne(id: string) {
    const Oneteam = await this.teamsModel.findOne({ where: { id } });
    return { status: 200, data: Oneteam };
  }
}
