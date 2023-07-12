import { Op } from "sequelize";
import { InterfazTramite } from "../models/InterfazTramite.js";
import { PDF_Files } from "../models/PDFModel.js";

export const getAllIT = async(request, response) =>{
    try {
        const tramites = await InterfazTramite.findAll();
    
        return response.status(200).json(
         tramites
        )
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }  
}

//obtener un  tramite
export const getTramiteIT = async(request, response) =>{
  
    const id = request.params.id;
  
    try {
        const tramite = await InterfazTramite.findAll({
            where:{
                id
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

export const filterByTramite = async(request, response) =>{
    
    const tipoUnidad = request.params.tipoUnidad;
    const tipoTramite = request.params.tipoTramite;

    try {
        const tramites = await InterfazTramite.findAll({ 
            where: { 
                [Op.and] : [{tipoUnidad}, { tipoTramite }]
            } 
        });
       
    
        return response.status(200).json(
         tramites
        )
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }  
}

//filtramos los tramites creados del usuario mediante su id y el tipo de tramite
export const filterByIdCreatorAndTramiteType = async(request, response) =>{
    
    const idCreador = request.params.idCreador;
    const tipoTramite = request.params.tipoTramite;

    try {
        const tramites = await InterfazTramite.findAll({ 
            where: { 
                [Op.and] : [{idCreador}, { tipoTramite }]
            } 
        });
       
    
        return response.status(200).json(
         tramites
        )
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }  
}

//crear tramite
export const createTramiteIT = async(request, response) =>{
 
    try {
        await InterfazTramite.create(request.body);
        response.status(201).json({
            ok: true,
            "message": "Creado correctamente"
        })
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
}

//update 
export const updateTramiteIT = async(request, response) =>{
    const id = request.params.id;
    console.log(id);
    try {
        await InterfazTramite.update(request.body,{
            where: {
                id 
            }
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


//delete 
export const deleteTramiteIT = async(request, response) =>{

    const id = request.params.id;

    try {

        const findById =  await InterfazTramite.findByPk(id);   

        // const data =  await UsoSuelo.findOne({
        //     where:{
        //         id
        //     },
        // })

        // console.log(data)

        if(!findById){
            return response.status(404).json({
                ok: false,
                "Message" : `No se ha encontrado un registro con el id: ${id}`
            })
        }



        PDF_Files.destroy({
            where: {
                idGenerales: id
            }
        })

        await InterfazTramite.destroy({
            where:{
                id
            }
        });

        response.json({
            ok: true,
            "message": "Eliminado correctamente",
        })

    } catch (error) {
        response.status(404).json({
            ok: false,
            message: error.message
        })
    }
}

