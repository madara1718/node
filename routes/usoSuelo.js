
import express from 'express';

import { createTramiteUDS, deleteTramiteUDS, filterByIdAssigned, filterByIdCreator, getAllUDS, getEstado, getTramiteUDS, updateTramiteUDS } from '../controllers/usoSueloController.js';


const router = express.Router();


router.get('/', getAllUDS);
router.get('/getState', getEstado);
router.get('/getByIdCreator/:idCreador', filterByIdCreator);
router.get('/filterByIdAssigned/:idTramiteAsignado', filterByIdAssigned);
router.post('/new', createTramiteUDS);
router.put('/:id', updateTramiteUDS);
router.delete('/:id', deleteTramiteUDS);
router.get('/:id', getTramiteUDS);


export default router;