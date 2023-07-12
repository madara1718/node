
import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { PDF_Files } from "./PDFModel.js";

export const ZonificacionVB = db.define('zonificacionesvb',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true     
    },
    idVistoBueno: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        references: {
            model: 'vistosbueno',
            key: 'id'
        }
    },
    zona:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    area:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    tipoRuta:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    zona6:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    afectadoHumedal:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    zmt:{
        type: DataTypes.STRING,
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
},
    {
        tableName: 'zonificacionesvb',
        //timestamps: false
    }
);

ZonificacionVB.hasMany(PDF_Files,{
    foreignKey: 'idZonificacionVB',
    onDelete: 'cascade',
    hooks: true
});

PDF_Files.belongsTo(ZonificacionVB, {
    foreignKey: "idZonificacionVB",
    onDelete: 'cascade',
    hooks: true
});

