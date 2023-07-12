
import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { AccountRoles } from "./AccountRolesModel.js";


export const User = db.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreUsuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gradoUsuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoUnidad:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    

},
    {
        tableName: 'users',
        timestamps: false,
    }
);


User.hasMany(AccountRoles,{
    foreignKey: 'account_id'
});

AccountRoles.belongsTo(User, {
    foreignKey: "account_id",  
});

// User.hasMany(AccountRoles,{
//     foreignKey: 'role_id'
// });

// AccountRoles.belongsTo(User, {
//     foreignKey: "role_id",  
// });
