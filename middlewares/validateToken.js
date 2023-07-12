import jwt from 'jsonwebtoken';


export const validateJWT = (req, res, next) =>{
    // const token = request.header('x-token')
    // //console.log(token)
    // if(!token){
    //     return response.status(401).json({
    //         ok: false,
    //         msg: "No hay token en la peticion"
    //     })
    // }

    // try {
    //    const {uid,name} =  jwt.verify(
    //     token,
    //     process.env.SECRET_WORD_JWT
    //    )
    //    request.uid = uid
    //    request.name = name

    // } catch (error) {
    //     return response.status(401).json({
    //         ok: false,
    //         msg: 'Token no valido'
    //     })
    // }
    // next()
    
    try {
        const token = req.headers.authorization ? String(req.headers.authorization).replace("Bearer ", "") : null;
       
        if (token && token !== null) {
            const decode = jwt.verify(token, process.env.SECRET_WORD_JWT);
            req.user = decode;
            //req.user = decode;
            next();
        } else 
            return res.send({message: "Invalid token 1"})
    } catch (error) {
        console.log(error)
        return res.send({message: "Invalid token 2"})
    }
}