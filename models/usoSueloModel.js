
import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { Zonificacion } from "./zonificacionModel.js";
import { PDF_Files } from "./PDFModel.js";

export const UsoSuelo = db.define('usosuelos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true     
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Se encuentra en Ingeneria',
        allowNull: false,
    },
    idUnidad: {
        type: DataTypes.STRING,
        defaultValue: 'Unidad-Tecnica'
    },
    nombreSolicitante:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    nombrePropetario:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    cedula:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    distrito:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    planoCatastro:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    tipoUsoSuelo:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    propiedadMatricula:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,      
    },
    updatedAt: {
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
    idUsuarioDestino:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    zona:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
},
    {
        tableName: 'usosuelos',
    }

);

//FORANEA DE PDFS ADJUNTOS
UsoSuelo.hasMany(PDF_Files,{
    foreignKey: 'idUsoSuelo',
    onDelete: 'cascade',
    hooks: true
});

PDF_Files.belongsTo(UsoSuelo, {
    foreignKey: "idUsoSuelo",
    onDelete: 'cascade',
    hooks: true
});
