
import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { ZonificacionVB } from "./zonificacionVBModel.js";
import { PDF_Files } from "./PDFModel.js";

export const VistoBueno = db.define('vistosbueno',{
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
    nombreSolicitante: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombrePropietario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cedula:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    cedulaPropietario:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    nombreProyecto:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    descripcionProyecto:{
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    planoCatastro:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    propiedadMatricula:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    direccionInmueble:{
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    correoElectronico:{
        type: DataTypes.TEXT,
        allowNull: false,  
    },
    fax:{
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
    zona:{
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
},
    {
        tableName: 'vistosbueno',
        timestamps: false
    }

);
//FORANEA DE PDFS ADJUNTOS
VistoBueno.hasMany(PDF_Files,{
    foreignKey: 'idVistoBueno'
});

PDF_Files.belongsTo(VistoBueno, {
    foreignKey: "idVistoBueno",  
});

