import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class StockServicio {
    api = window.location.origin + "/BackendControlStock/api/stock";
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

    async nuevo(stock){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", stock, "");
        return await base;
    }

    async modificar(stock){
        let base = await this.peticiones.peticionesVarias(this.api, "PUT", stock, "");
        return await base;
    }

    async eliminar(stock){
        let base = await this.peticiones.peticionesVarias(this.api, "DELETE", stock, "");
        return await base;
    }
}
export default StockServicio;