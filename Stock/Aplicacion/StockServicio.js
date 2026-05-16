import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class StockServicio {
    api = "http://localhost/BackendControlStock/api/stock";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    getStock(id){
        alert("proximamente. id: " + id);
    }

    async getStocks(desde, cantidad){
        let dir = this.api + "/" + desde + "/" + cantidad;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }

    async getByProductoId(productoId){
        let dir = this.api + "/" + productoId;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        return json;
    }

    async nuevo(producto){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", producto, "");
        return await base;
    }

    async modificar(producto){
        let base = await this.peticiones.peticionesVarias(this.api, "PUT", producto, "");
        return await base;
    }

    async eliminar(producto){
        let base = await this.peticiones.peticionesVarias(this.api, "DELETE", producto, "");
        return await base;
    }
}
export default StockServicio;