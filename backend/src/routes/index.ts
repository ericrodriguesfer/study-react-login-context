import { Router } from 'express';
import users from './user.routes';
import session from './sessios.routes';

const router: Router = Router();

router.use('/users', users);
router.use('/session', session);

export default router;
