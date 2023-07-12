import express from 'express';
import { createTramiteIT, deleteTramiteIT, filterByIdCreatorAndTramiteType, filterByTramite, getAllIT, getTramiteIT, updateTramiteIT } from '../controllers/interfazTramite.js';


const router = express.Router();

router.get('/', getAllIT);
router.get('/getByTramite/:tipoUnidad/:tipoTramite', filterByTramite);
router.get('/getByCreator/:idCreador/:tipoTramite', filterByIdCreatorAndTramiteType);
router.post('/new', createTramiteIT);
router.put('/:id', updateTramiteIT);
router.delete('/:id', deleteTramiteIT);
router.get('/:id', getTramiteIT);

export default router;