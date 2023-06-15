import * as Jwt from 'jsonwebtoken';
import TokenGenerator from '../Interfaces/TokenGenerator';
import usersInterface from '../Interfaces/usersInterface';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = Jwt;
  generate(user: usersInterface): string {
    const token = this.jwt.sign({ id: user.id }, 'jwt_secret');
    return token;
  }
}
