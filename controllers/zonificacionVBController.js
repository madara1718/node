
import { vistoBuenoData } from "../dataTable/data.js";
import { PDF_Files } from "../models/PDFModel.js";
import { VistoBueno } from "../models/vistoBuenoModel.js";
import { ZonificacionVB } from "../models/zonificacionVBModel.js";

export let idEstado = 0;

export const getAllZonificacionVB = async (request, response) => {

    try {
        const tramites = await ZonificacionVB.findAll();

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

//filtro para visualizar solo las zonificaciones creadas por un usuario en especifico mediante su id
export const filterZonificacionByIdCreator = async (request, response) => {

    const idCreador = request.params.idCreador;

    try {
        const tramites = await ZonificacionVB.findAll({
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

export const getZonificacionVB = async (request, response) => {

    const id = request.params.id;

    try {
        const tramite = await ZonificacionVB.findAll({
            where: {
                id
            }
        });

        response.status(200).json(
            tramite
        );

    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        });
    }
}

//crear tramite
export const createZonificacionVB = async (request, response) => {

    try {
        let zonaFor = "";
        let areaFor = "";

        for (let i = 0; i < request.body.zona.length; i++) {

            zonaFor += request.body.zona[i] + ','
            areaFor += request.body.area[i] + ','
        }

        await ZonificacionVB.create({
            idVistoBueno: request.body.idVistoBueno,
            zona: zonaFor,
            area: areaFor,
            tipoRuta: request.body.tipoRuta,
            zona6: request.body.zona6,
            afectadoHumedal: request.body.afectadoHumedal,
            zmt: request.body.zmt,
            nombreSolicitante: request.body.nombreSolicitante,
            nombrePropietario: request.body.nombrePropietario,
            cedula: request.body.cedula,
            cedulaPropietario: request.body.cedulaPropietario,
            nombreProyecto: request.body.nombreProyecto,
            descripcionProyecto: request.body.descripcionProyecto,
            planoCatastro: request.body.planoCatastro,
            propiedadMatricula: request.body.propiedadMatricula,
            direccionInmueble: request.body.direccionInmueble,
            telefono: request.body.telefono,
            correoElectronico: request.body.correoElectronico,
            fax: request.body.fax,
            idCreador: request.body.idCreador,
            creador: request.body.creador,
        });

        //await ZonificacionVB.create(request.body);
        response.status(201).json({
            ok: true,
            "message": "Creado correctamente",
        })
    } catch (error) {
        response.json({
            ok: false,
            "message": "Creado correctamente",
            message: error.message
        })
    }
}



//update 
export const updateZonificacionVB = async (request, response) => {

    const id = request.params.id;
    try {
        await ZonificacionVB.update(request.body, {
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
export const deleteZonificacionVB = async (request, response) => {

    const id = request.params.id;

    try {
        PDF_Files.destroy({
            where: {
                idZonificacionVB: id
            }
        })

        await ZonificacionVB.destroy({
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

