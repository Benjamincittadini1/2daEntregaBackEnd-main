
import config from "../../configs/config.js";

class ProdfirebaseController {

    constructor() {
        this.db = config.firebase.db;
        this.query = this.db.collection('products')
    }

    getAll = async () => {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            return docs.map((doc) => (doc.data()))
        } catch (err) {
            console.log(err)
            throw new Error('Error returning all products')
        }
    }

    save = async (element) => {
        try {
            const elements = await this.getAll()
            if (elements.length === 0) {
                element.id = 1;
            } else {
                element.id = elements.map((el) => el.id).sort().reverse()[0] + 1;
            }
            element.timestamp = new Date().toISOString();
            let doc = this.query.doc(`${element.id}`)
            await doc.create(element)
            return element
        } catch (err) {
            console.log(err)
            throw new Error('falla en el guardado')
        }
    }


    getById = async (id) => {
        try {
            try {
                const doc = this.query.doc(`${id}`)
                const item = await doc.get()
                return item.data()
            } catch (err) {
                console.log(err)
                throw new Error('Error pidiendo los datos')
            }
        } catch (err) {
            console.log(err)
            throw new Error('Error pidiendo los datos')
        }
    }

    updateById = async ( id, newValues) => {

        try {
			const product = this.getById(id)
			const toModify = this.query.doc(`${id}`)
			if (product != undefined) {
				if (newValues.nombre != undefined || '') {
					await toModify.update({
						nombre: newValues.nombre,
					})
				}
				if (newValues.descripcion != undefined || '') {
					await toModify.update({
						descripcion: newValues.descripcion,
					})
				}
				if (newValues.foto != undefined || '') {
					await toModify.update({
						foto: newValues.foto,
					})
				}
				if (newValues.precio != undefined || '') {
					await toModify.update({
						precio: newValues.precio,
					})
				}
                if (newValues.stock != undefined || '') {
					await toModify.update({
						stock: newValues.stock,
					})
				}
                if (newValues.codigo != undefined || '') {
					await toModify.update({
						codigo: newValues.codigo,
					})
				}
				return true
			} else {
				return false
			}
		} catch (err) {
			console.log(err)
			throw new Error('Error updating')
		}
    }

    deleteById = async (id) => {
        try {
            const productToDelete = this.query.doc(`${id}`)
            if (productToDelete) {
                await productToDelete.delete()
                return true
            } else {
                return false
            }
        } catch {
            throw new Error('Error al borrar el producto')
        }
    }

    deleteAll = async () => {
        try {
            const snapshot = await this.query.get()

            const batchSize = snapshot.size
            const deleteCollection = async (batchSize) => {
                const orderCollections = this.query.orderBy('id').limit(batchSize)
                return new Promise((resolve, reject) => {
                    deleteQueryBatch(resolve).catch(reject)
                })
            }
            const deleteQueryBatch = async (resolve) => {
                if (batchSize === 0) {
                    resolve()
                    return
                }

                const batch = this.db.batch()
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref)
                })
                await batch.commit()

                process.nextTick(() => {
                    deleteQueryBatch(resolve)
                })
            }

            deleteCollection(batchSize)
        } catch {
            throw new Error('Error borrando')
        }
    }
}

export default ProdfirebaseController;