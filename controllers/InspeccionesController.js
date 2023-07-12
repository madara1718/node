import { Op } from "sequelize";
import { inspecciones } from "../models/InspeccionesModel.js";
import { PDF_Files } from "../models/PDFModel.js";

export const getAllInspecciones = async(request, response) =>{
    try {
        const tramites = await inspecciones.findAll();
    
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
export const getInspeccion = async(request, response) =>{
  
    const id = request.params.id;
  
    try {
        const tramite = await inspecciones.findAll({
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

export const filterByTipoInspeccion = async(request, response) =>{
    
    const {tipoInspeccion} = request.params;
    

    try {
        const AllInspecciones = await inspecciones.findAll({ 
            where: { 
            asunto:tipoInspeccion
            } 
        });
       
    
        return response.status(200).json(
            AllInspecciones
        )
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }  
}


//filtramos los tramites creados del usuario mediante su id
export const filterByIdCreator = async(request, response) =>{
    
    const idCreador = request.params.idCreador;

    try {
        const tramites = await inspecciones.findAll({ 
            where: { 
                idCreador
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
export const createInspeccion = async(request, response) =>{
 
    try {
        await inspecciones.create(request.body);
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
export const updateInspeccion = async(request, response) =>{
    const id = request.params.id;
    
    try {
        await inspecciones.update(request.body,{
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
export const deleteInspeccion = async(request, response) =>{

    const id = request.params.id;

    try {

        const findById =  await inspecciones.findByPk(id);   

  
        if(!findById){
            return response.status(404).json({
                ok: false,
                "Message" : `No se ha encontrado un registro con el id: ${id}`
            })
        }

        PDF_Files.destroy({
            where: {
                idInspecciones: id
            }
        })

        await inspecciones.destroy({
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

