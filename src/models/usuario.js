import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Usuario