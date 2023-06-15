import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getOneTeam(req, res));

export default teamsRouter;
