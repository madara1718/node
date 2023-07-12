import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";

export const PDF_Files = db.define('pdf_files',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true     
    },
    idUsoSuelo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usosuelos',
            key: 'id'
        }
    },
    idVistoBueno: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        references: {
            model: 'vistosbueno',
            key: 'id'
        }
    },
    idZonificacion: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        references: {
            model: 'zonificaciones',
            key: 'id'
        }
    },
    idZonificacionVB: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        references: {
            model: 'zonificacionesvb',
            key: 'id'
        }
    },
    idInspecciones: {
        type: DataTypes.INTEGER,
        //allowNull: false,
    },
    idGenerales: {
        type: DataTypes.INTEGER,
        //allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    file_data: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
},
    {
        tableName: 'pdf_files',
        timestamps: false
    }

);