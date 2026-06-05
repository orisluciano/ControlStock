import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class PrecioServicio {
    api = window.location.origin + "/BackendControlStock/api/precio";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    async getPreciosById(id, desde, hasta){
        let dir = this.api + "/" + id + "/" + desde + "/" + hasta;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }

    async getUltimoPrecio(id){
        let dir = this.api + "/ultimoprecio/" + id;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }

    async nuevo(precio){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", precio, "");
        return await base;
    }

    modificar(precio){
        alert("proximamente");
    }

    eliminar(precio){
        alert("proximamente");
    }
}
export default PrecioServicio;