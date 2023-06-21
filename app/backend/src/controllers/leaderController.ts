import { Request, Response } from 'express';
import LeaderService from '../services/leaderBoardService';

export default class LeaderController {
  private leaderService: LeaderService;
  constructor() {
    this.leaderService = new LeaderService();
  }

  public async getAllLeader(_req: Request, res: Response) {
    const { status, data } = await this.leaderService.allMatches();
    return res.status(status).json(data);
  }
}
