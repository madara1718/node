
import express from 'express';
import { check } from 'express-validator';
import { changePassword, deleteUser, getAllUsers, getAllZonificacionUsers, getUser, login, register, reNew, resetPassword, shitUser } from '../controllers/userController.js';
import { validarCampos } from '../middlewares/validateSpaces.js';



const router = express.Router();


router.get('/', getAllUsers);
router.get('/zonificacionUsers', getAllZonificacionUsers);

router.post('/register', 
        //middleware
[
    check('nombreUsuario', 'El nombre del usuario es requerido').notEmpty(),
    check('contrasena', 'La contrasena debe contener al menos 6 caracteres').isLength({min: 6}),
    validarCampos
]
,register);

router.post('/login', 
     //middleware
[
    check('nombreUsuario', 'El nombre del usuario es requerido').notEmpty(),
    check('contrasena', 'La contrasena debe contener al menos 6 caracteres').isLength({min: 6}),
    validarCampos
]
,login);


router.post('/resetPassword', 
     //middleware
[
    check('nombreUsuario', 'El nombre del usuario es requerido').notEmpty(),
    validarCampos
]
,resetPassword);

router.post('/changePassword', 
        //middleware
[
 
    check('nuevaContrasena', 'Las contrasenas deben contener al menos 6 caracteres y coincidir').isLength({min: 6}),
   

    validarCampos
]
,changePassword);


router.get('/renew', reNew)
router.delete('/:nombreUsuario', deleteUser);
router.put('/edit/:id', shitUser);
router.get('/:id', getUser);
export default router;