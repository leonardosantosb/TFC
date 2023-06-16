import { Router } from 'express';
import UsersService from '../services/userService';
import UserController from '../controllers/userController';
import UserModel from '../database/models/usersModelsSequelize';
import EncrypterBcryptService from '../services/EncrypterBcryptService';
import TokenGeneratorJwt from '../utils/TokenGeneratorJwt';
import LoginMiddlewares from '../middlewares/loginMiddlewares';
import tokenValidation from '../middlewares/tokenValidation';

const userRouter = Router();

const userModel = UserModel;
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UsersService(userModel, encrypter, tokenGenerator);
const userController = new UserController(userService);

userRouter.post('/', LoginMiddlewares.LoginValidate, (req, res) => userController.login(req, res));
userRouter.get('/role', tokenValidation, (req, res) => userController.getRole(req, res));

export default userRouter;
