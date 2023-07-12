import express from 'express';
import { createPDF, getAllPDF, getById, deletePDF, getByTramite} from '../controllers/pdfController.js';
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: 'uploads/'});

router.get('/', getAllPDF);
router.get('/:id', getById);
router.get('/findBy/:tipoTramite/:id', getByTramite);
router.post('/new', upload.single('pdf'), createPDF);
router.delete('/:id', deletePDF);

export default router;