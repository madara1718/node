import express from 'express';
import { 
    createZonificacion, deleteZonificacion, filterZonificacionByIdCreator, 
    getAllZonificacion, getZonificacion, updateZonificacion 
} from '../controllers/zonificacionController.js';


const router = express.Router();

router.get('/', getAllZonificacion);
router.get('/getZonificacionByIdCreator/:idCreador', filterZonificacionByIdCreator);
router.post('/new', createZonificacion);
router.put('/:id', updateZonificacion);
router.delete('/:id', deleteZonificacion);
router.get('/:id', getZonificacion);



export default router;