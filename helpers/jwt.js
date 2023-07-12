
import jwt from 'jsonwebtoken';
//const { sign, verify } = jwt;

export const generateJWT = (uid, name, role, apellidos, gradoUsuario, tipoUnidad, tipoTramite, roles) =>{

    return new Promise( (resolve,reject) =>{

        const payload = {uid, name, role, apellidos, gradoUsuario,tipoUnidad, tipoTramite, roles}

        jwt.sign(payload, process.env.SECRET_WORD_JWT,{
            expiresIn: '2h'
        },(err, token) =>{

            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
           
        })

    })

}