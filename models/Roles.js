import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";



export const Roles = db.define('roles',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    nombreRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    }
},
    {
        tableName: 'roles',
        timestamps: false,
    }

);







