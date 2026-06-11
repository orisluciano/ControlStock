import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class TipoProductoServicio {
    api = window.location.origin + "/BackendControlStock/api/tipoProducto";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async nuevo(tipoProducto){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", tipoProducto, "");
        return await base;
    }

    async modificar(tipoProducto){
        let base = await this.peticiones.peticionesVarias(this.api, "PUT", tipoProducto, "");
        return await base;
    }

    async eliminar(tipoProducto){
        let base = await this.peticiones.peticionesVarias(this.api, "DELETE", tipoProducto, "");
        return await base;
    }

    async getProductos() {
        let peticion = await this.peticiones.peticionGet(this.api, "GET");
        return await peticion;
    }
}

export default TipoProductoServicio;