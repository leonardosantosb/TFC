import { Request, Response } from 'express';
import User from '../services/userService';

export default class UserController {
  constructor(
    private userService : User,
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { email, password } = req.body;

    const { data, status } = await this.userService.findLogin(email, password);
    const isValidEmail = emailRegex.test(email);
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!isValidEmail || password.lenght < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(status).json(data);
  }
}
