import sequelize from './config/database.js';
import Producto from './models/producto.js';
import Tienda from './models/tienda.js';
import Usuario from './models/usuario.js';

const productos = [
    { id: 1, titulo: 'Playstation 5',                       descripcion: 'Consola de videojuegos',                  precio: 2500.00, categoria: 'Consolas',    img: 'https://plazavea.vteximg.com.br/arquivos/ids/29033795-1000-1000/20404194.jpg' },
    { id: 2, titulo: 'Nintendo Switch 2',                   descripcion: 'Consola de videojuegos',                  precio: 2900.00, categoria: 'Consolas',    img: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2534/PMP20000870001/full_image-1.jpeg' },
    { id: 3, titulo: "Ghost of Yotei Collector's Edition",  descripcion: 'Edición de colección de Ghost of Yotei',  precio: 1000.00, categoria: 'Videojuegos', img: 'https://press-start.com.au/wp-content/uploads/2025/04/Ghost-of-YOtei-CE-1.jpg' },
    { id: 4, titulo: 'EAFC26 Ultimate edition',             descripcion: 'Edición Ultima de EAFC 26',               precio: 300.00,  categoria: 'Videojuegos', img: 'https://gamescenter.pe/wp-content/uploads/2025/07/FC-26-Ultimate-Edition-PS5.webp' }
];

const tiendas = [
    { id: 1, nombre: 'Videojuegos Katty - Surco', direccion: 'Av. Sin Nombre 123' },
    { id: 2, nombre: 'Diversiones Fantasia',      direccion: 'Larcomar tienda N-23' },
    { id: 3, nombre: 'Importaciones Daniel',      direccion: 'Av. Javier Prado 123' }
];

// Password según src/sql/inserts.sql (bcrypt)
const usuarios = [
    { id: 1, nombre: 'Juan Perez', usuario: 'jperez', password: '$2b$10$mCyOLn9Wz0bXA4/geTihKO61sliHwlq0F5AfbhyjFjeeChv6KTWx2', rol: 'Admin' }
];

async function migrate() {
    try {
        // Recrea las tablas según los modelos y carga la data semilla
        await sequelize.sync({ force: false });
        await Producto.bulkCreate(productos);
        await Tienda.bulkCreate(tiendas);
        await Usuario.bulkCreate(usuarios);

        // Sincroniza las secuencias de los ids tras insertar ids explícitos
        for (const tabla of ['productos', 'tiendas', 'usuarios']) {
            await sequelize.query(
                `SELECT setval(pg_get_serial_sequence('${tabla}', 'id'), (SELECT MAX(id) FROM ${tabla}))`
            );
        }

        console.log(`Migración completada: ${productos.length} productos, ${tiendas.length} tiendas y ${usuarios.length} usuarios insertados.`);
    } catch (error) {
        console.error('Error en la migración:', error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

migrate();
