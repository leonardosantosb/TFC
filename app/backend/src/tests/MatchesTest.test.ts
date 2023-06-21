import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/matchesModelsSequelize';
import mocksMatches from '../mocks/mockMatches';
import mockUsers from '../mocks/mockUsers';

chai.use(chaiHttp);

const { expect } = chai

describe('Matches Test', function () { 
  beforeEach(function () { sinon.restore(); });
  it('get all matches', async () => {
    sinon.stub(matchesModel, 'findAll').resolves(mocksMatches.allMatches as any);
    const response = await chai
    .request(app)
    .get('/matches');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(mocksMatches.allMatches)
  })

  it('matches ended', async () => {
    sinon.stub(matchesModel, 'update').resolves(mocksMatches.allMatches as any);
    const response = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set('Authorization', mockUsers.token )
    .send(mocksMatches.matchesEnded);

    expect(response.status).to.be.equal(200)
  })
  it('matches Scored', async () => {
    sinon.stub(matchesModel, 'update').resolves(mocksMatches.allMatches as any);
    const response = await chai
    .request(app)
    .patch('/matches/1')
    .set('Authorization', mockUsers.token )
    .send(mocksMatches.matchesEnded);

    expect(response.status).to.be.equal(200)
  })
  it('create Matches', async () => {
    const create = matchesModel.build(mocksMatches.createMatches as any);
    sinon.stub(matchesModel, 'create').resolves(create);
    const response = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', mockUsers.token )
    .send(mocksMatches.create);

    expect(response.status).to.be.equal(201)

  })
  it('Se nao tiver um dos times', async () => {
    const create = matchesModel.build(mocksMatches.createMatches as any);
    sinon.stub(matchesModel, 'create').resolves(create);
    const response = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', mockUsers.token )
    .send( mocksMatches.createError);

    expect(response.status).to.be.equal(404)

    expect(response.body).to.be.deep.equal({
      message: 'There is no team with such id!'
    })
    
  })
})