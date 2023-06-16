import Encrypter from '../Interfaces/encrypter';
import Users from '../database/models/usersModelsSequelize';
import TokenGenerator from '../Interfaces/TokenGenerator';

export default class UsersService {
  constructor(
    private usersModel = Users,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
  ) {}

  public async findLogin(email: string, password: string) {
    // const hash = await this.encrypter.encrypt(password);
    const messageError = 'Invalid email or password';
    const user = await this.usersModel.findOne({ where: { email } });

    if (!user) {
      return { status: 401, data: { message: messageError } };
    }
    const isValid = await this.encrypter.compare(password, user.password);
    if (!isValid) {
      return { status: 401, data: { message: messageError } };
    }
    const token = this.tokenGenerator.generate(user);
    return { status: 200, data: { token } };
  }

  public async getRole(id: string) {
    const user = await this.usersModel.findOne({ where: { id } });

    if (!user) {
      return { status: 404, data: { message: 'User not found' } };
    }
    const { role } = user.dataValues;
    return { status: 200, data: role };
  }
}
