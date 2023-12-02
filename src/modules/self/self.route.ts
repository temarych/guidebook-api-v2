import { Router }         from 'express';
import { authorize }      from '@middleware/auth.middleware';
import { selfController } from './self.controller';

export const selfRoute = Router();

selfRoute.get('/', authorize, selfController.getSelf);
selfRoute.delete('/', authorize, selfController.deleteSelf);
