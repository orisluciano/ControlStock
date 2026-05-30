import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class MovimientoStockServicio {
    api = "http://localhost/BackendControlStock/api/movimientoStock";
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
}
export default MovimientoStockServicio;