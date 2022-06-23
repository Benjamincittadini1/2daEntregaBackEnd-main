
class memoryController {
    constructor() {
        this.elements = [];
    }

    save = async (element) => {
        try {
            if (this.elements.length === 0) {
                element.id = 1;
            } else {
                element.id = this.elements.map(element => element.id).sort().reverse()[0] + 1;
            }
            element.timestamp = Date.now();
            this.elements.push(element);
            return element;
        }
        catch (error) {
            throw new error(error);
        }
    }

    getAll = () => {
        try {
            return [...this.elements];
        }
        catch (error) {
            throw new error(error);
        }
    }

    deleteAll = () => {
        try {
            this.elements = [];
        } catch (error) {
            throw new error(error);
        }
    }

    getById = (id) => {
        try {
            return this.elements.find(prod => prod.id == id);
        }
        catch (error) {
            throw new error(error);
        }
    }
    deleteById = async (id) => {
        try {
            const index = this.elements.findIndex(element => element.id == id);
            if (index === -1) {
                return undefined;
            } else {
                this.elements.splice(index, 1);
                return this.elements;
            }
        } catch (error) {
            throw new error(error);
        }
    }

    updateById = (id, newElement)=>{
        try {
            const element = this.elements.find(element => element.id == id);
            const index = this.elements.indexOf(element);
            if (index === -1) {
                return undefined;
            } else {
                this.elements[index].timestamp = Date.now();
                if (newElement.nombre) { this.elements[index].nombre = newElement.nombre };
                if (newElement.descripcion) { this.elements[index].descripcion = newElement.descripcion };
                if (newElement.codigo) { this.elements[index].codigo = newElement.codigo };
                if (newElement.foto) { this.elements[index].foto = newElement.foto };
                if (newElement.precio) { this.elements[index].precio = newElement.precio };
                if (newElement.stock) { this.elements[index].stock = newElement.stock };
                return this.elements[index];
            }
        }
        catch (error) {
            throw new error(error);
        }
    }
}

export default memoryController;
