import * as express from 'express';
import teamsRouter from './routes/teamsRoutes';
import userRouter from './routes/userRoutes';
import matchesRouter from './routes/matchesRoutes';
import leaderRouter from './routes/leaderRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    // this.app.use(express.json());

    this.config();

    // Não remover essa  rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.routes();
  }

  private routes():void {
    this.app.use('/teams', teamsRouter);
    this.app.use('/login', userRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
