import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    const { status, data } = await this.matchesService.findAll();

    if (inProgress === 'true') {
      const matchesTrue = data.filter((match) => match.inProgress === true);
      return res.status(status).json(matchesTrue);
    }
    if (inProgress === 'false') {
      const matchesFalse = data.filter((match) => match.inProgress === false);
      return res.status(status).json(matchesFalse);
    }
    return res.status(status).json(data);
  }
}
