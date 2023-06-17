import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesService.findAll();
    return res.status(status).json(data);
  }
}
