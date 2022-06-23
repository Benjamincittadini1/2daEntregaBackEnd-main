import mongoose from "mongoose";
import CartMongoController from "../../controllers/mongodb/CartMongoController.js";

const schema = new mongoose.Schema({
    id: { type: Number, required: true },
	timestamp: { type: Number},
	productos: { type: Array },
});


class MongoDbDaoCarts extends CartMongoController {
    constructor() {
        super('carts', schema);
    }
}

export default MongoDbDaoCarts;