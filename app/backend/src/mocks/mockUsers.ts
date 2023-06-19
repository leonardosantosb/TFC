const validLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const invalidEmail = {
  email: 'admin@',
  password: 'secret_admin',
};

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'secret',
};

const emailout = {
  password: 'secret_admin',
};

export default {
  validLogin,
  invalidEmail,
  invalidPassword,
  emailout,
};
