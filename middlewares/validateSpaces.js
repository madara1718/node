import {validationResult} from 'express-validator'

export const validarCampos = (request, response, next) => {

    const errores = validationResult(request);
    if (!errores.isEmpty()) {
        return response.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }
    next();
}