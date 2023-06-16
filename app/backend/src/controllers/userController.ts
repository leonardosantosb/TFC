import { Request, Response } from 'express';
import User from '../services/userService';

export default class UserController {
  constructor(
    private userService : User,
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { data, status } = await this.userService.findLogin(email, password);
    return res.status(status).json(data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const { data, status } = await this.userService.getRole(id);
    console.log(data, status);

    return res.status(status).json({ role: data });
  }
}
