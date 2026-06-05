import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class TipoStockServicio {
    api = window.location.origin + "/BackendControlStock/api/tipostock";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async getTodo(){
        let dir = this.api;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }
}

export default TipoStockServicio;