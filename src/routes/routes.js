import { Router } from "express";
import { productsDao, cartDao } from '../daos/index.js'
import login from "../middlewares/loginMiddleware.js";


export const routerProducto = Router();
export const routerCarrito = Router();

//aca irian los daos---------------------------------------------------
const productos = productsDao;
const carrito = cartDao;
//---------------------------------------------------------------------
routerProducto.
    route('/:id?')
    .get(async (req, res) => {
        if (req.params.id) {
            const product = await productos.getById(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).send({ message: "Producto no encontrado" });
            }
        } else {
            const products = await productos.getAll();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(404).send({ message: "Producto no encontrado" });
            }
        }
    })
    .post(login, async (req, res) => {
        if (req.params.id) {
            res.status(400).json('no es posible crear un producto con un ID ya que es generado automaticamente');
        } else {
            const product = await productos.save(req.body);
            console.log(product);
            res.status(201).json(`el producto '${product.nombre}' se ha creado correctamente`);
        }
    })
    .delete(login, async (req, res) => {
        if (req.params.id) {
            const product = await productos.deleteById(req.params.id);
            if (product) {
                res.status(200).json('producto eliminado correctamente');
            } else {
                res.status(404).json({ error: 'No existe producto con dicho ID' });
            }
        } else {
            const products = await productos.deleteAll();
            if (!products) {
                res.status(200).json('todos los productos eliminados correctamente');
            } else {
                res.status(404).json({ error: 'error al borrar productos' });
            }
        }

    })
    .put(login, (req, res) => {
        const product = productos.updateById(req.params.id, req.body);
        if (product) {
            res.status(201).json(`el producto se ha actualizado correctamente`)
        } else {
            res.status(404).json({ error: 'No existe producto con dicho ID' });
        }
    })


routerCarrito.
    route('/')
    .post(async (req, res) => {
        const id = await carrito.createCarrito();
        res.status(201).json(`carrito creado con el id: ${id} correctamente`);
    })


routerCarrito.
    route('/:id/productos')
    .get(async (req, res) => {
        const products = await carrito.getById(req.params.id);
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).send({ message: "Carrito no encontrado" });
        }

    })
    .post((req, res) => {
        const producto = carrito.addProduct(req.params.id, req.body);
        if (producto) {
            res.status(201).json('producto agregado correctamente');
        } else {
            res.status(404).json({ error: 'No existe carrito con dicho ID' });
        }
    })

routerCarrito.
    route('/:id/productos/:id_prod')
    .delete((req, res) => {
        const deleteProd = carrito.deleteProduct(req.params.id, req.params.id_prod);
        if (deleteProd) {
            res.status(200).json(`el producto con el id:${req.params.id_prod} ha sido eliminado correctamente`);
        } else {
            res.status(404).json({ error: 'No existe producto con dicho ID' });
        }
    })


