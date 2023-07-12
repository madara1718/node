import { Op } from "sequelize";
import { VistoBueno } from "../models/vistoBuenoModel.js";
import { PDF_Files } from "../models/PDFModel.js";

export const getAllVB = async (request, response) => {
    try {
        const tramites = await VistoBueno.findAll();

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
export const getTramiteVB = async (request, response) => {

    const id = request.params.id;

    try {
        const tramite = await VistoBueno.findAll({
            where: {
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

//obtener los estados incompletos
export const getEstadoVB = async (request, response) => {


    try {
        const tramites = await VistoBueno.findAll({
            where: {
                estado: "Se encuentra en Ingeneria"
            }
        });
        console.log(tramites)

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

//obtenemos los tramites que fueron asignados al id de un usuario
export const filterByIdAssigned = async (request, response) => {

    const idUsuarioDestino = request.params.idTramiteAsignado;
    console.log(idUsuarioDestino)

    try {
        const tramites = await VistoBueno.findAll({
            where: {
                // operador and de sequelize, dice => donde asignarTramite sea el que pasamos por params y que estado sea "se encuentra en ingeneria"
                [Op.and]: [{ idUsuarioDestino }, { estado: "Se encuentra en Ingeneria" }]
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

//filtramos los tramites creados del usuario mediante su id
export const filterByIdCreator = async (request, response) => {

    const idCreador = request.params.idCreador;

    try {
        const tramites = await VistoBueno.findAll({
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

//crear tramite
export const createTramiteVB = async (request, response) => {

    try {
        await VistoBueno.create(request.body);
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
export const updateTramiteVB = async (request, response) => {
    const id = request.params.id;

    try {
        await VistoBueno.update(request.body, {
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
export const deleteTramiteVB = async (request, response) => {

    const id = request.params.id;

    try {

        PDF_Files.destroy({
            where: {
                idVistoBueno: id
            }
        })

        await VistoBueno.destroy({
            where: {
                id
            }
        });

        response.json({
            ok: true,
            "message": "Eliminado correctamente"
        })
    } catch (error) {
        response.status(404).json({
            ok: false,
            message: error.message
        })
    }

}