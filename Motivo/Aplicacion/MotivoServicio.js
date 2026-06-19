import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class MotivoServicio {
    api = window.location.origin + "/BackendControlStock/api/motivo";
    peticiones = new PeticionesHttp();
    constructor(parameters) {
        
    }

    async nuevo(motivo){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", motivo, "");
        return await base;
    }

    async modificar(motivo){
        let base = await this.peticiones.peticionesVarias(this.api, "PUT", motivo, "");
        return await base;
    }

    async eliminar(motivo){
        let base = await this.peticiones.peticionesVarias(this.api, "DELETE", motivo, "");
        return await base;
    }

    async getMotivos() {
        let peticion = await this.peticiones.peticionGet(this.api, "GET");
        return await peticion;
    }
}

export default MotivoServicio;