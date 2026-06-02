import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class TipoProductoServicio {
    api = "http://localhost/BackendControlStock/api/tipoproducto";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async getProductos() {
        let peticion = await this.peticiones.peticionGet(this.api, "GET");
        return await peticion;
    }
}

export default TipoProductoServicio;