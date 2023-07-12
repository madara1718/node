import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { PDF_Files } from "./PDFModel.js";

export const InterfazTramite = db.define('interfaztramites',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true     
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreCompleto:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    cedula:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    tipoTramite:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    tipoUnidad:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: new Date()     
    },
    creador:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    idCreador:{
        type: DataTypes.INTEGER,
        allowNull: false,   
    },

},
    {
        tableName: 'interfaztramites',
        timestamps: false
    }
);

InterfazTramite.hasMany(PDF_Files,{
    foreignKey: 'idGenerales',
    onDelete: 'cascade',
    hooks: true
});

PDF_Files.belongsTo(InterfazTramite, {
    foreignKey: "idGenerales",
    onDelete: 'cascade',
    hooks: true
});


