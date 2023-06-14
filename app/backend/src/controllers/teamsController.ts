import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(
    private teamsService: TeamsService,
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamsService.findAll();
    console.log(data);
    return res.status(status).json(data);
  }
}
