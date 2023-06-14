import { Router } from 'express';
// import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/teamsController';

// const teamsService = new TeamsService();
const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getOneTeam(req, res));

export default teamsRouter;
