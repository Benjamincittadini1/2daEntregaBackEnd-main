import 'dotenv/config'

let productsDao
let cartDao

switch (process.env.PERSISTENCIA) {
	case 'json':
		const { default: fileDaoCarts } = await import('../daos/carts/fileDaoCarts.js');
		const { default: fileDaoProducts } = await import('../daos/products/fileDaoProducts.js');

		cartDao = new fileDaoCarts();
		productsDao = new fileDaoProducts();
		break
	case 'mongodb':
		const { default: mongoDbDaoCarts } = await import('./carts/mongoDbDaoCarts.js');
		const { default: mongoDbDaoProducts } = await import('./products/mongoDbDaoProducts.js');

		cartDao = new mongoDbDaoCarts();
		productsDao = new mongoDbDaoProducts();
		break
	case 'firebase':
		const { default: DaoFirebaseCart } = await import('./carts/firebaseDaoCarts.js');
		const { default: DaoFirebaseProduct } = await import('./products/firebaseDaoProducts.js');

		cartDao = new DaoFirebaseCart();
		productsDao = new DaoFirebaseProduct();
		break
	default:
		const { default: memoryDaoCarts } = await import('../daos/carts/memoryDaoCarts.js');
		const { default: memoryDaoProducts } = await import('../daos/products/memoryDaoProducts.js');

		cartDao = new memoryDaoCarts();
		productsDao = new memoryDaoProducts();
		break
}

export { productsDao, cartDao };