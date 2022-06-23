import ProdFileController from '../../controllers/files/ProdFileController.js';
import config from '../../configs/config.js';

class fileDaoProducts extends ProdFileController {
    constructor() {
        super(config.fileSystem.dirProducts);
    }
}

export default fileDaoProducts;