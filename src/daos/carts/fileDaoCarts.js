import CartFileController from '../../controllers/files/CartFileController.js';
import config from '../../configs/config.js';

class fileDaoProducts extends CartFileController {
    constructor() {
        super(config.fileSystem.dirCarts);
    }
}

export default fileDaoProducts;