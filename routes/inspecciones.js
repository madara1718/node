import express from 'express';
import { createInspeccion, deleteInspeccion, filterByIdCreator, filterByTipoInspeccion, getAllInspecciones, getInspeccion, updateInspeccion } from '../controllers/InspeccionesController.js';


const router = express.Router();

router.get('/', getAllInspecciones);
router.get('/getByTramite/:tipoInspeccion', filterByTipoInspeccion);
router.get('/getByIdCreator/:idCreador', filterByIdCreator);
router.post('/new', createInspeccion);
router.put('/:id', updateInspeccion);
router.delete('/:id', deleteInspeccion);
router.get('/:id', getInspeccion);

export default router;