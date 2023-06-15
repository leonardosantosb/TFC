import { Router } from 'express';
import UsersService from '../services/userService';
import UserController from '../controllers/userController';
import UserModel from '../database/models/usersModelsSequelize';
import EncrypterBcryptService from '../services/EncrypterBcryptService';
import TokenGeneratorJwt from '../utils/TokenGeneratorJwt';

const userRouter = Router();

const userModel = UserModel;
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UsersService(userModel, encrypter, tokenGenerator);
const userController = new UserController(userService);

userRouter.post('/', (req, res) => userController.login(req, res));

export default userRouter;
