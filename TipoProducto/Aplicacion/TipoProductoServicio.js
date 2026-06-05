import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class TipoProductoServicio {
    api = window.location.origin + "/BackendControlStock/api/tipoProducto";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async getProductos() {
        let peticion = await this.peticiones.peticionGet(this.api, "GET");
        return await peticion;
    }
}

export default TipoProductoServicio;