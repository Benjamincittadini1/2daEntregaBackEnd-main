import fs from 'fs';

class ProdFileController {
    constructor(fileName) {
        this.fileName = fileName;
    }

    save = async (element) => {
        try {
            if (fs.existsSync(this.fileName)) {
                const elements = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
                element.id = elements.map(element => element.id).sort().reverse()[0] + 1;
                element.timestamp = Date.now();
                elements.push(element);
                fs.writeFileSync(this.fileName, JSON.stringify(elements));
            } else {
                const elements = [];
                element.id = 1;
                element.timestamp = Date.now();
                elements.push(element);
                fs.writeFileSync(this.fileName, JSON.stringify(elements));
            }
        }
        catch (error) {
            throw new error(error);
        }
    }

    getAll = () => {
        try {
            if (fs.existsSync(this.fileName)) {
                return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            } else {
                return undefined;
            }
        }
        catch (error) {
            throw new error(error);
        }
    }

    deleteAll = () => {
        try {
            if (fs.existsSync(this.fileName)) {
                fs.unlinkSync(this.fileName);
            }
        } catch (error) {
            throw new error(error);
        }
    }

    getById = (id) => {
        try {
            const elements = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            return elements.find(element => element.id == id);
        }
        catch (error) {
            throw new error(error);
        }
    }
    deleteById = (id) => {
        try {
            const elements = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const element = elements.find(el => el.id == id);
            console.table(element);
            const index = elements.indexOf(element);
            console.log(index);
            if (index === -1) {
                return undefined;
            } else {
                elements.splice(index, 1);
                fs.writeFileSync(this.fileName, JSON.stringify(elements));
                return elements;
            }
        }
        catch (error) {
            throw new error(error);
        }
    }
    updateById = (id, newElement) => {
        try {
            const elements = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const element = elements.find(element => element.id == id);
            const index = elements.indexOf(element);
            if (index === -1) {
                return undefined;
            } else {
                elements[index].timestamp = Date.now();
                if (newElement.nombre) { elements[index].nombre = newElement.nombre };
                if (newElement.descripcion) { elements[index].descripcion = newElement.descripcion };
                if (newElement.codigo) { elements[index].codigo = newElement.codigo };
                if (newElement.foto) { elements[index].foto = newElement.foto };
                if (newElement.precio) { elements[index].precio = newElement.precio };
                if (newElement.stock) { elements[index].stock = newElement.stock };
                fs.writeFileSync(this.fileName, JSON.stringify(elements));
                return elements[index];
            }
        }
        catch (error) {
            throw new error(error);
        }
    }
}

export default ProdFileController;
