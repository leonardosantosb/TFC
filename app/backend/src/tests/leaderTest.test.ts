import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/matchesModelsSequelize';
import mocksLeaders from '../mocks/mockLeaders';
import mockUsers from '../mocks/mockUsers';

chai.use(chaiHttp);

const { expect } = chai

describe('leaderBoard Test', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Se retorna 200', async () => {
    const response = await chai
    .request(app)
    .get('/leaderboard/home')
    .set('Authorization', mockUsers.token )
    .send( mocksLeaders);

    expect(response.status).to.be.equal(200)
    })
  })
