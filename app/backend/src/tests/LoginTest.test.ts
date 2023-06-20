import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import usersModel from '../database/models/usersModelsSequelize';
import mockUsers from '../mocks/mockUsers';

// import { Response } from 'superagent';
// import TeamsService from '../services/teamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Test', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Se o Email e Senha são validos', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(login);

    const response = await chai
      .request(app)
      .post('/login')
      .send(mockUsers.validLogin);

    expect(response.status).to.be.equal(200);
    
  });

  it('Se o Email é invalido', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(login);

    const response = await chai
      .request(app)
      .post('/login')
      .send(mockUsers.invalidEmail);

    expect(response.status).to.be.equal(401);

    expect(response.body).to.be.deep.equal({
      message: 'Invalid email or password'
    })
  }) 
    
  it('Se a Senha é invalida', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(login);

    const response = await chai
      .request(app)
      .post('/login')
      .send(mockUsers.invalidPassword);

    expect(response.status).to.be.equal(401);

    expect(response.body).to.be.deep.equal({
      message: 'Invalid email or password'
    })
  });
  it('Se o Email é nulo', async () => {
    sinon.stub(usersModel, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .post('/login')
      .send(mockUsers.emailout);

    expect(response.status).to.be.equal(400);

    expect(response.body).to.be.deep.equal({
      message: "All fields must be filled"
    })
  })
  
  it('Se pega o Role', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(login);

    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', mockUsers.token )
      .send(mockUsers.validLogin);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.deep.equal({
      role: 'admin'
    })
  }) 
  it('Se nao pega o Role', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'tokenerrado' )
      .send(mockUsers.validLogin);

    expect(response.status).to.be.equal(401);

    expect(response.body).to.be.deep.equal({
      message: "Token must be a valid token"
    })
  }) 
  it('Se nao pega o Role', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', mockUsers.token )
      .send(mockUsers.validLogin);

    expect(response.status).to.be.equal(404);

    expect(response.body.role).to.be.deep.equal({
      message: "User not found"
    })
  }) 
  it('Se nao encontra usuario', async () => {
    const login = usersModel.build(mockUsers.validLogin2);
    sinon.stub(usersModel, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .post('/login')
      .set('Authorization', mockUsers.token )
      .send(mockUsers.validLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message:'Invalid email or password' })
  }) 
});
