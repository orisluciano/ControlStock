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

    modificar(usuario){
        alert("proximamente");
    }

    eliminar(id){
        alert("proximamente");
    }
}
export default ProductoServicio;