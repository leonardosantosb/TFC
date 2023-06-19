import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import usersModel from '../database/models/usersModelsSequelize';
import mockUsers from '../mocks/mockUsers';
import tokenGenerator from '../utils/TokenGeneratorJwt';

// import { Response } from 'superagent';
// import TeamsService from '../services/teamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Test', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Se o Email e Senha são validos', async () => {
    const login = usersModel.build(mockUsers.validLogin as usersModel);
    sinon.stub(usersModel, 'findOne').resolves(login);
    sinon.stub(tokenGenerator, 'prototype').returns('token');
    const response = await chai.request(app).get('/users/login');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal('token')
  })

  it('Se o Email é invalido', async () => {
    sinon.stub(usersModel, 'findOne').resolves(mockUsers.invalidEmail as usersModel);
    const response = await chai.request(app).get('/users/login');

    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })

  it('Se o Senha é invalida', async () => {
    sinon.stub(usersModel, 'findOne').resolves(mockUsers.invalidPassword as usersModel);
    const response = await chai.request(app).get('/users/login');

    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })

  it('Se não encontrar o email', async () => {
    sinon.stub(usersModel, 'findOne').resolves(mockUsers.emailout as usersModel);
    const response = await chai.request(app).get('/users/login');

    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })
});
