
import express from 'express';

import { createTramiteVB, deleteTramiteVB, filterByIdAssigned, filterByIdCreator, getAllVB, getEstadoVB, getTramiteVB, updateTramiteVB } from '../controllers/vistoBuenoController.js';


const router = express.Router();


router.get('/', getAllVB);
router.get('/getState', getEstadoVB);
router.get('/getByIdCreator/:idCreador', filterByIdCreator);
router.get('/filterByIdAssigned/:idTramiteAsignado', filterByIdAssigned);
router.post('/new', createTramiteVB);
router.put('/:id', updateTramiteVB);
router.delete('/:id', deleteTramiteVB);
router.get('/:id', getTramiteVB);

export default router;