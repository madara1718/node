import { DataTypes }  from "sequelize";
import { db } from "../db/config.js";
import { Roles } from "./Roles.js";


export const AccountRoles = db.define('account_roles',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    },
    role_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
 
},
    {
        tableName: 'account_roles',
        timestamps: false,
    }

);

Roles.hasMany(AccountRoles,{
    foreignKey: "role_id",
    targetKey: "role_id"
});

AccountRoles.belongsTo(Roles,{
    foreignKey: "role_id"
})






