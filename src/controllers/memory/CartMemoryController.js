
class CartMemoryController {
	constructor() {
		this.container = [];
	}
	createCarrito = () => {
		const carrito = { id: this.container.length + 1, timestamp: Date.now(), productos: [] };
		this.container.push(carrito)
		return carrito.id;
	}


	getById = async (id) => {
		const cart = this.container.find(el => el.id === Number(id))
		return cart.productos;
	}

	addProduct = async (id, newProduct) => {
		try {
			const cart = this.container.find(el => el.id === Number(id));
			newProduct.timestamp = Date.now();
			if (cart.productos.length === 0) {
				newProduct.id = 1;
			} else {
				newProduct.id = cart.productos.map(el => el.id).sort().reverse()[0] + 1;
			}
			cart.productos.push(newProduct)
			return true;
		} catch (err) {
			throw new Error('error');
		}
	}

	deleteProduct = async (id, prodId) => {
		try {
			const cart = this.container.find(el => el.id === Number(id));
			const product = cart.productos.find(el => el.id === Number(prodId));
			const index = cart.productos.indexOf(product);
			if (index === -1) {
				return false;
			}
			cart.productos.splice(index, 1);
			return true;

		} catch {
			throw new Error('Error borrando el producto');
		}
	}

	deleteById = async (id) => {
		try {
			const index = this.container.findIndex((e) => e.id === id);
			this.container.splice(index, 1);
		} catch {
			throw new Error('No se pudo eliminar');
		}
	}
}

export default CartMemoryController;



