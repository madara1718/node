import { User } from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/jwt.js";
import jwt from "jsonwebtoken"
import { AccountRoles } from "../models/AccountRolesModel.js";
import { usersData } from "../dataTable/data.js";
import { Roles } from "../models/Roles.js";

export const getAllUsers = async(request, response) =>{

    try {
    const users = await User.findAll({
        include:{
            model: AccountRoles,
            attributes: ['role_id'],
            include:{
                model: Roles,
                attributes: ['nombreRol'],
            }
        },

        attributes: usersData
    });

    return response.status(200).json(
        users          
    )

    } catch (error) {
        response.json({
            ok: false,
            msg: error.message
        })
    }
}
export const getUser = async(request, response) =>{

    const id = request.params.id;

    try {
        const tramite = await User.findAll({
            where: {
                id
            },
            include:{
                model: AccountRoles,
                attributes: ['role_id'],
            }
        });

        response.json(
            tramite
        );

    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        });
    }
}

export const getAllZonificacionUsers = async(request, response) =>{

    try {
        //console.log(request.body)

    const users = await User.findAll({
        include:{
            model: AccountRoles,
            attributes: ['role_id'],
            where:{
                role_id : 4
            }
        },
      
        attributes: usersData
    });

    return response.status(200).json(
        users          
    )

    } catch (error) {
        response.json({
            ok: false,
            msg: error.message
        })
    }
}

export const register = async(request, response) =>{

    try {

        const {nombre, apellidos, nombreUsuario, gradoUsuario, tipoUnidad, subUnidad, contrasena, roleId} =  request.body;
        

        //verificamos si el nombreUsuario existe
        let user = await User.findOne({
            where: {
                nombreUsuario
            }
        })


        if(user){
           return response.status(500).json({
                ok : false,
                msg: "El usuario ya se encuentra registrado"
            })
        }

        //obtenemos la contrasena del usuario para encriptarla
        const encryp = bcrypt.hashSync(contrasena, 10);
        


        //creamos el usuario
       user = await User.create({
            nombre,
            apellidos,
            nombreUsuario,
            gradoUsuario,
            tipoUnidad,
            subUnidad,
            contrasena: encryp,    
        });

        
        let userRole = await AccountRoles.create({
            account_id: user.id,
            role_id: roleId
        })

        //generamos el token
        const token = await generateJWT(user.id, user.nombre, userRole.role_id)

        return response.status(201).json({
                ok: true,
                uid: user.id,
                nombre,
                token,
                userRole: userRole.role_id,
            
            })
    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: error.message
            
        })
    }

}//el que vea esta vara es playo
export const shitUser = async(request, response) =>{
    const id = request.params.id;

    try {
        await User.update(request.body, {
            where: {
                id
            }
        })
        await AccountRoles.update( { role_id: request.body.role_id }, {
            where: {
                account_id:id
            },
            fields: ['role_id']
        })
        response.json({
            ok: true,
            "message": "Actualizado correctamente"
        })
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
   

}



export const deleteUser = async(request, response) =>{

    try {

        const {nombreUsuario} =  request.params;
        

        //verificamos si el nombreUsuario existe
        let user = await User.findOne({
            where: {
                nombreUsuario
            }
        })
        const {id}=user
   
        AccountRoles.destroy({
            where: {
                account_id: id
            }
        });

        User.destroy({
            where:{
                id
            }
        });

         
        return response.status(201).json({
                ok: true
            })
    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: error.message
            
        })
    }

}

export const resetPassword = async(request, response) =>{
    try {
        const {nombreUsuario} = request.body

        let user = await User.findOne({
            where: {
                nombreUsuario
            }
        })
        
        if(user){

            //declaramos la contrasena por defecto
            const defaultPassword = '123456'; // preguntar que contrasena poner por default
            //encriptamos esa contrasena por defecto y se la asignamos la contrasena del update
            const encryp = bcrypt.hashSync(defaultPassword, 10);

            user = await User.update(
                {
                contrasena: encryp
                },
                {
                    where: {
                        nombreUsuario
                    }
                }
            )

            return response.status(200).json({
                msg: 'Se ha restablecido la contrasena por defecto'
            })
            
        }else{
            return response.status(404).json('El usuario ingresado no existe')
        }
    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: error.message
            
        })
    }
}

export const changePassword = async(request, response) =>{
    try {
        const { id, nuevaContrasena, confirmarContrasena} = request.body

        let user = await User.findOne({
            where: {
                id
            }
        })

        
        if(user){   
        
            if(nuevaContrasena === confirmarContrasena){

            //encriptamos la contrasena y se le asgina a la contrasena de update
            const encryp = bcrypt.hashSync(nuevaContrasena, 10);

            user = await User.update(
                {
                contrasena: encryp
                },
                {
                    where: {
                        id
                    }
                }
            )

            return response.status(200).json({
                msg: 'Se ha realizado el cambio de contrasena'
            })
            }else{
                return response.status(500).json({
                    msg: 'Las contrasenas deben de coincidir'
                })
            }
      
            
        }else{
            return response.status(404).json('El usuario ingresado no existe')
        }

    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: error.message
            
        })
    }
}


export const login  = async(request, response) =>{

    try {
        let {nombreUsuario, contrasena} = request.body
    

        //verificar si el correo existe
        let user = await User.findOne({
            where:{
                nombreUsuario
            },
            include:{
                model: AccountRoles,
                include:{
                    model : Roles
                }
            }         
        })

        //(error de antes) era "!user", no "!correo"
        if(!user){
            return response.status(404).json({
                msg: 'El usuario ingresado no se encuentra registrado'
            })
        }
   

        //verificar si las contrasenas coinciden
        //(error) tenia hashSync en vez de compareSync
        const validPassword = bcrypt.compareSync(contrasena, user.contrasena);

        if(!validPassword ){
            return response.status(404).json({
                msg: 'La contrasena ingresada no es valida'
            })
        }

        let userRole = await AccountRoles.findOne({
            where:{
                account_id: user.id
            }
        })

        //generar jwt
        const token = await generateJWT(user.id, user.nombre, userRole.role_id, user.apellidos, user.gradoUsuario, user.tipoUnidad, user.tipoTramite, user.account_roles)

        console.log(user)

        //validaciones anteriores correctas entonces ...
        response.status(200).json({
            uid: user.id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            gradoUsuario: user.gradoUsuario,
            tipoUnidad: user.tipoUnidad,
            token,
            userRole: userRole.role_id,
            roles: user.account_roles
            
        })

    } catch (error) {
        return response.json({
            ok: false,
            msg: error.message
        })
    }

}

export const reNew = async(request, response) =>{

    // const uid = request.uid
    // const name = request.name

    // const token = await generateJWT(uid, name)

    // response.json({
    //     ok: true,
    //     uid,
    //     name,
    //     token
    // })
    const token = request.headers.authorization ? String(request.headers.authorization).replace("Bearer ", "") : null
    //console.log(token)
    if(token && token !== null){
        //console.log('entre')
        // Verify the token using jwt.verify method
        try {
            //console.log(token)
            //console.log(process.env.SECRET_WORD_JWT)
            const decode = jwt.verify(token, 'EsTA,Ez_lA_Pa-labra-Inc-rei_blemente,secreta');
            console.log(decode)
            
            
            //const accessToken = jwt.sign({decode}, JWT_HASH, {expiresIn: "1h"});

            //  Return response with decode data
            return response.status(200).send({message: "login/success", token, data: decode})
        } catch (err) {
            //console.log('entre a catch')
            if (err?.message === "jwt expired") {
                // Return response with error
                return response.status(403).send({message: "login/failed"})
            }else{
                return response.json({
                    msg: err
                })
            }
        }
    }else{
        // Return response with error
        return response.status(401).send({message: "login/failed"})
    }

}