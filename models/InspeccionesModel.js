import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { AccountRoles } from "./AccountRolesModel.js";


export const inspecciones = db.define('inspecciones',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacion:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cedula:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coordenadas:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
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
        tableName: 'inspecciones',
        timestamps: false,
    }
);


// User.hasMany(AccountRoles,{
//     foreignKey: 'account_id'
// });

// AccountRoles.belongsTo(User, {
//     foreignKey: "account_id",  
// });

// User.hasMany(AccountRoles,{
//     foreignKey: 'role_id'
// });

// AccountRoles.belongsTo(User, {
//     foreignKey: "role_id",  
// });
