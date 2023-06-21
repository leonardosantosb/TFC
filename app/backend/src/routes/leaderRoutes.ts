import { Router } from 'express';
import LeaderController from '../controllers/leaderController';

const leaderController = new LeaderController();

const leaderRouter = Router();

leaderRouter.get('/home', (req, res) => leaderController.getAllLeader(req, res));

export default leaderRouter;
