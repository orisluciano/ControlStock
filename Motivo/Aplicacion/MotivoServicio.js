import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class MotivoServicio {
    api = window.location.origin + "/BackendControlStock/api/motivo";
    peticiones = new PeticionesHttp();
    constructor(parameters) {
        
    }

    async getMotivos() {
        let peticion = await this.peticiones.peticionGet(this.api, "GET");
        return await peticion;
    }
}

export default MotivoServicio;