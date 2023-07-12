import { Op } from "sequelize";
import { PDF_Files } from "../models/PDFModel.js";
import fs from 'fs';


export const getAllPDF = async (request, response) => {
    try {
        const tramites = await PDF_Files.findAll();

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

export const getById = async (request, response) => {

    const id = request.params.id;

    try {

        const file = await PDF_Files.findByPk(id);
        const temp = file.name.split('.');

        if (!file) {
            return response.status(404).send('Archivo no encontrado');
        }

        const fileBuffer = Buffer.from(file.file_data, 'hex');
        if (temp[temp.length - 1] === 'pdf') {
            response.setHeader('Content-Type', 'application/pdf');
        } else {
            response.setHeader('Content-Type', `image/${temp[temp.length - 1]}`);
        }
        response.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        response.send(fileBuffer);
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
}

export const getByTramite = async (request, response) => {

    const tipoTramite = request.params.tipoTramite;
    const id = request.params.id;

    try {

        if (tipoTramite === 'idUsoSuelo') {
            const tramite = await PDF_Files.findAll({
                where: {
                    [Op.and]: [{
                        idUsoSuelo: {
                            [Op.not]: null
                        }
                    }, {
                        idUsoSuelo: id
                    }],
                }
            });
            response.json(
                tramite
            );
        } else {

            if (tipoTramite === 'idVistoBueno') {
                const tramite = await PDF_Files.findAll({
                    where: {
                        [Op.and]: [{
                            idVistoBueno: {
                                [Op.not]: null
                            }
                        }, {
                            idVistoBueno: id
                        }],
                    }
                });
                response.json(
                    tramite
                );
            } else {
                if (tipoTramite === 'idZonificacion') {
                    const tramite = await PDF_Files.findAll({
                        where: {
                            [Op.and]: [{
                                idZonificacion: {
                                    [Op.not]: null
                                }
                            }, {
                                idZonificacion: id
                            }],
                        }
                    });
                    response.json(
                        tramite
                    );
                } else {
                    if (tipoTramite === 'idZonificacionVB') {
                        const tramite = await PDF_Files.findAll({
                            where: {
                                [Op.and]: [{
                                    idZonificacionVB: {
                                        [Op.not]: null
                                    }
                                }, {
                                    idZonificacionVB: id
                                }],
                            }
                        });
                        response.json(
                            tramite
                        );
                    } else {
                        if (tipoTramite === 'idInspecciones') {
                            const tramite = await PDF_Files.findAll({
                                where: {
                                    [Op.and]: [{
                                        idInspecciones: {
                                            [Op.not]: null
                                        }
                                    }, {
                                        idInspecciones: id
                                    }],
                                }
                            });
                            response.json(
                                tramite
                            );
                        } else {
                            const tramite = await PDF_Files.findAll({
                                where: {
                                    [Op.and]: [{
                                        idGenerales: {
                                            [Op.not]: null
                                        }
                                    }, {
                                        idGenerales: id
                                    }],
                                }
                            });
                            response.json(
                                tramite
                            );
                        }
                    }
                }
            }
        }

    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        });
    }
}

//adjuntar PDFS
export const createPDF = async (request, response) => {

    try {
        const data = await fs.promises.readFile(request.file.path);

        await PDF_Files.create({ idUsoSuelo: request.body.idUsoSuelo, idVistoBueno: request.body.idVistoBueno, idZonificacion: request.body.idZonificacion, idZonificacionVB: request.body.idZonificacionVB, idInspecciones: request.body.idInspecciones, idGenerales: request.body.idGenerales, name: request.file.originalname, file_data: data });
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

//delete 
export const deletePDF = async (request, response) => {

    const id = request.params.id;

    try {

        const findById = await PDF_Files.findByPk(id);

        if (!findById) {
            return response.status(404).json({
                ok: false,
                "Message": `No se ha encontrado un registro con el id: ${id}`
            })
        }
        //eliminarlo de la tabla
        await PDF_Files.destroy({
            where: {
                id
            }
        });

        response.json({
            ok: true,
            "message": "Eliminado correctamente",
        })

        deleteUpload()

    } catch (error) {
        response.status(404).json({
            ok: false,
            message: error.message
        })
    }
}

const deleteUpload = () => {
    const carpeta = 'uploads/';

    // Verificar si la carpeta existe
    if (fs.existsSync(carpeta)) {
        // Obtener la lista de archivos en la carpeta
        const archivos = fs.readdirSync(carpeta);

        // Eliminar cada archivo de la carpeta
        archivos.forEach((archivo) => {
            const rutaArchivo = `${carpeta}/${archivo}`;

            // Eliminar el archivo
            fs.unlinkSync(rutaArchivo);
        });

        console.log('Contenido de la carpeta eliminado.');
    } else {
        console.log('La carpeta no existe.');
    }
}