import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controllers/matchesController';
import validateMatches from '../middlewares/matchesMiddleware';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch('/:id/finish', tokenValidation, (req, res) =>
  matchesController.matchesEnded(req, res));
matchesRouter.patch('/:id', tokenValidation, (req, res) =>
  matchesController.matchesScored(req, res));
matchesRouter.post('/', tokenValidation, validateMatches, (req, res) =>
  matchesController.createMatches(req, res));
export default matchesRouter;
