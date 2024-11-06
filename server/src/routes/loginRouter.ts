import Router, { Request, Response } from 'express';
import { loginUser } from '../handlers/users.ts';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  await loginUser(req, res);
});

export default router;
