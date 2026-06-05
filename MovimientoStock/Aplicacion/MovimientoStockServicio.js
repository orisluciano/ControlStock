import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class MovimientoStockServicio {
    api = window.location.origin + "/BackendControlStock/api/movimientoStock";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async getMovsById(id, desde, hasta){
        let dir = this.api + "/" + id + "/" + desde + "/" + hasta;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }

    async nuevoMov(movimiento){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", movimiento, "");
        return await base;  
    }
}
export default MovimientoStockServicio;