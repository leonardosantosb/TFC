import { NextFunction, Request, Response } from 'express';

class LoginMiddlewares {
  static LoginValidate(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const lengthPassword = password.length;
    const maxPassword = 6;

    if (lengthPassword < maxPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default LoginMiddlewares;
