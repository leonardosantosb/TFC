export default interface Encrypter {
  encrypt: (password: string) => Promise<string>;
  compare: (password: string, hash: string) => Promise<boolean>;
}
