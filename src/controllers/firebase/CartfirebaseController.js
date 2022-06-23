import config from "../../configs/config.js";


class CartfirebaseController {
	constructor() {
		this.db = config.firebase.db;
		this.query = this.db.collection('carts');
	}
	createCarrito = async () => {
		try {
			const carts = await this.getAllCart();
			let newID;
			if (carts.length == 0) {
				newID = 1;
			} else {
				newID = Number(carts[carts.length - 1].id) + 1;
			}
			const timestamp = new Date().toISOString();
			let doc = this.query.doc(`${newID}`);
			const newCart = { id: newID, timestamp: timestamp, productos: [] };
			await doc.create({ ...newCart });
			return newID;
		} catch (err) {
			throw new Error('No se pudo crear');
		}
	}

	getAllCart = async () => {
		try {
			const querySnapshot = await this.query.get();
			let docs = querySnapshot.docs;
			return docs.map((doc) => (doc.data()));
		} catch (err) {
			throw new Error('Error');
		}
	}


	addProduct = async (cartId, newElement) => {
		try {
			const cart = this.query.doc(`${cartId}`);
			const cartInfo = await cart.get();
			if (cartInfo.data().productos.length == 0) {
				newElement.id = 1;
			} else {
				newElement.id = cartInfo.data().productos.map((e) => e.id).sort().reverse()[0] + 1;
			}
			newElement.timestamp = new Date().toISOString();
			const productsInCart = cartInfo.data().productos;
			productsInCart.push(newElement);
			await cart.update({ productos: productsInCart });
		} catch (e) {
			throw new Error('Error adding product');
		}
	}

	getById = async (cartId)=> {
		try {
			const doc = this.query.doc(`${cartId}`);
			const element = await doc.get();
			const cart = element.data();
			if (cart) {
				return cart?.productos;
			} else {
				throw new Error('Error getting all products');
			}
		} catch {
			throw new Error('Error getting all products');
		}
	}

		deleteProduct = async (cartId, prodId) => {
		try {
			const carts = await this.getAllCart();
			const cartIndex= carts.findIndex((el) => el.id == cartId);
			if (cartIndex >= 0) {
				const productsOnCart= carts[cartIndex].productos;
				const prodToDeleteIndex= productsOnCart.findIndex((el) => el.id == prodId);
				if (prodToDeleteIndex >= 0) {
					productsOnCart.splice(prodToDeleteIndex, 1);
					await this.query.doc(`${cartId}`).update({ productos: productsOnCart });
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch {
			throw new Error('Error borrando el producto');
		}
	}

}

export default CartfirebaseController