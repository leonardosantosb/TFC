import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch('/:id/finish', tokenValidation, (req, res) =>
  matchesController.matchesEnded(req, res));

export default matchesRouter;
