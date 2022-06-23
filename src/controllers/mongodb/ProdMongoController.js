import mongoose from "mongoose";
import config from "../../configs/config.js";

try {
    mongoose.connect(config.mongoDb.url, config.mongoDb.options)
    console.log("Connected to MongoDB Products");
} catch (error) {
    console.log(error);
};


class ProdMongoController {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    save = async (element) => {
        try {
            element.timestamp = new Date().toISOString();
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    getAll = async () => {
        try {
            return await this.collection.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await this.collection.findById({ _id: id });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateById(id, element) {
        try {
            return await this.collection.findByIdAndUpdate({ _id: id }, element);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            return await this.collection.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            return await this.collection.deleteMany({});
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProdMongoController;
