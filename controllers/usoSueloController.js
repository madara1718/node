
import { Op } from "sequelize";
import { UsoSuelo } from "../models/usoSueloModel.js";
import { db } from "../db/config.js";
import { PDF_Files } from "../models/PDFModel.js";

export const getAllUDS = async (request, response) => {
    try {
        const tramites = await UsoSuelo.findAll();

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
export const getTramiteUDS = async (request, response) => {

    const id = request.params.id;

    try {
        const tramite = await UsoSuelo.findAll({
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
export const getEstado = async (request, response) => {


    try {
        const tramites = await UsoSuelo.findAll({
            where: {
                estado: "Se encuentra en Ingeneria"
            }
        });
        //console.log(tramites)

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
        const tramites = await UsoSuelo.findAll({
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
        const tramites = await UsoSuelo.findAll({
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
export const createTramiteUDS = async (request, response) => {

    try {
        await UsoSuelo.create(request.body);
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

export const proc = async (id) => {
    db.query("CALL actualizar_ZonaU(:id_tramite)", {
        replacements: {
            id_tramite: id
        }
    }).then(resultados => {
        console.log('SIUUUU');
    }).catch(error => {
        console.log("13");
    });
}

//update 
export const updateTramiteUDS = async (request, response) => {
    const id = request.params.id;

    try {
        await UsoSuelo.update(request.body, {
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
    proc(id);
}


//delete 
export const deleteTramiteUDS = async (request, response) => {

    const id = request.params.id;

    try {

        const findById = await UsoSuelo.findByPk(id);

        if (!findById) {
            return response.status(404).json({
                ok: false,
                "Message": `No se ha encontrado un registro con el id: ${id}`
            })
        }

        PDF_Files.destroy({
            where: {
                idUsoSuelo: id
            }
        })

        await UsoSuelo.destroy({
            where: {
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

