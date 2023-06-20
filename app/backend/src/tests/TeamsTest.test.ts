import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsModel from '../database/models/teamsModelsSequelize';
import mocksTeams from '../mocks/mocksTeams';

chai.use(chaiHttp);

const { expect } = chai

describe('Teams Test', function () { 
  beforeEach(function () { sinon.restore(); });
  it('get all teams', async () => {
    sinon.stub(teamsModel, 'findAll').resolves(mocksTeams.getAllTeams as teamsModel[]);
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(mocksTeams.getAllTeams)
  })

  it('get one team', async () => {
    sinon.stub(teamsModel, 'findOne').resolves(mocksTeams.getOneteam as teamsModel);
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(mocksTeams.getOneteam)
  })
});
