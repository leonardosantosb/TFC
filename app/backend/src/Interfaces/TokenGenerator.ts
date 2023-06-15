import Users from './usersInterface';

export default interface TokenGenerator {
  generate(user: Users): string
}
