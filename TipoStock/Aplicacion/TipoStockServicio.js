import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class TipoStockServicio {
    api = window.location.origin + "/BackendControlStock/api/tipostock";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async nuevo(tipoStock){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", tipoStock, "");
        return await base;
    }

    async modificar(tipoStock){
        let base = await this.peticiones.peticionesVarias(this.api, "PUT", tipoStock, "");
        return await base;
    }

    async eliminar(tipoStock){
        let base = await this.peticiones.peticionesVarias(this.api, "DELETE", tipoStock, "");
        return await base;
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