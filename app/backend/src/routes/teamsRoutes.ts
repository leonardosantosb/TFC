import { Router } from 'express';
import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/teamsController';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAllTeams);

export default teamsRouter;
