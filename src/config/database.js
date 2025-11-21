import Sequelize from 'sequelize'
import pg from 'pg'

//Variables
/*
const hostname = 'localhost';
const username = 'postgres';
const password = 'pg4dm1n$';
const database = 'tiendadb';
const port = '5432';
const dialect = 'postgres';
*/

const hostname = process.env.DB_HOST || 'prograweb-bd-jcromaina-2025-1.postgres.database.azure.com';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'Password!';
const database = process.env.DB_NAME || 'tiendadb';
const port = process.env.DB_PORT || 5432;
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    dialectModule: pg
})

export default sequelize;