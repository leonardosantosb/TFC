const emailString = 'admin@admin.com';

const validLogin = {
  email: emailString,
  password: 'secret_admin',
};
const validLogin2 = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: emailString,
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const invalidEmail = {
  email: 'admin@',
  password: 'secret_admin',
};

const invalidPassword = {
  email: emailString,
  password: 'secret',
};

const emailout = {
  password: 'secret_admin',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
+ 'eyJpZCI6MSwiaWF0IjoxNjg3MTMzMDQ2fQ.'
+ 'bpBiMpJdxvQyqC6Z8uyh_H9BJq7_DkU78IkOqMOqNe0';

export default {
  validLogin,
  invalidEmail,
  invalidPassword,
  emailout,
  validLogin2,
  token,
};
