import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class ProductoServicio {
    api = "http://localhost/BackendControlStock/api/producto";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    getProducto(id){
        alert("proximamente. id: " + id);
    }

    async getProductos(desde, cantidad){
        let dir = this.api + "/" + desde + "/" + cantidad;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        console.log(json);
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
export default ProductoServicio;