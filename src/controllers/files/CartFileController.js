import fs from 'fs';

class CartFileController {
    constructor(fileName) {
        this.fileName = fileName;
    }

    createCarrito = async ()=> {
        try {
            if (fs.existsSync(this.fileName)) {
                const carritos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
                const id = carritos.map(carrito => carrito.id).sort().reverse()[0] + 1;
                const carrito = { id, timestamp: Date.now(), productos: [] };
                carritos.push(carrito);
                fs.writeFileSync(this.fileName, JSON.stringify(carritos));
                return carrito.id;
            } else {
                const carritos = [];
                const carrito = { id: 1, timestamp: Date.now(), productos: [] };
                carritos.push(carrito);
                fs.writeFileSync(this.fileName, JSON.stringify(carritos));
                return carrito.id;
            }
        }
        catch (error) {
            throw new error (error);
        }
    }

    deleteById = (id) => {
        try {
            const carritos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const carrito = carritos.find(carrito => carrito.id == id);
            const index = carritos.indexOf(carrito);
            if (index === -1) {
                return undefined;
            }
            carritos.splice(index, 1);
            fs.writeFileSync(this.fileName, JSON.stringify(carritos));
        }
        catch (error) {
            throw new error (error);
        }
    }

    getById = (id) => {
        try {
            const carritos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            return carritos.find(carrito => carrito.id == id);
        }
        catch (error) {
            throw new error (error);
        }
    }

    addProduct = (id, producto) => {
        try {
            const carritos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const carrito = carritos.find(carrito => carrito.id == id);
            producto.timestamp = Date.now();
            if (carrito.productos.length === 0) {
                producto.id = 1;
            }
            else {
                producto.id = carrito.productos.map(producto => producto.id).sort().reverse()[0] + 1;
            }
            carrito.productos.push(producto);
            fs.writeFileSync(this.fileName, JSON.stringify(carritos));
            return carrito
        }
        catch (error) {
            throw new error (error);
        }
    }

    deleteProduct = (id, productoId)=>{
        try {
            const carritos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const carrito = carritos.find(carrito => carrito.id == id);
            const producto = carrito.productos.find(producto => producto.id == productoId);
            const index = carrito.productos.indexOf(producto);
            if (index === -1) {
                return undefined;
            }
            carrito.productos.splice(index, 1);
            fs.writeFileSync(this.fileName, JSON.stringify(carritos));
            return carrito;
        }
        catch (error) {
            throw new error (error);
        }
    }
}

export default CartFileController;