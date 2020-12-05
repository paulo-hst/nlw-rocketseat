import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index); // index: listagem de todos os orfanatos
routes.get('/orphanages/:id', OrphanagesController.show); // show: listar apenas um orfanato
routes.post('/orphanages', upload.array('images'), OrphanagesController.create); // create: criação

export default routes;