import express from 'express';
import productoRouter from './src/routes/producto.js'
import usuarioRouter from './src/routes/usuario.js'
import tiendaRouter from './src/routes/tienda.js'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, resp) => {
    return resp.json({ mensaje: "Hola mundo", code: 200});
})

app.use('/producto', productoRouter);
app.use('/tienda', tiendaRouter);
app.use('/auth', usuarioRouter);

export default app