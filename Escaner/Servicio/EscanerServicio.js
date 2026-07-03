import ProductoServicio from "../../Producto/Aplicacion/ProductoServicio.js";
import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class EscanerServicio {
    api = window.location.origin + "/BackendControlStock/api/precio";
    peticiones = new PeticionesHttp();

    constructor() {
        
    }

    async buscarProducto(codigo, tipoCodigo){
        let respuesta = {
            encontrado : null,
            producto : null
        }
        let datos = {
            codigo : codigo,
            tipoCodigo : tipoCodigo
        };
        let base = await this.peticiones.peticionesVarias(this.api, "POST", datos, "");
        if (base.errores.length > 0) {
            respuesta.encontrado = false;
        } else {
            if (base.respuesta.codigo === codigo && base.respuesta.tipoCodigo === tipoCodigo) {
                respuesta.encontrado = true;
                respuesta.producto = base.respuesta;   
            } else {
                respuesta.encontrado = false;
            }
        }
        return respuesta;
    }
}
export default EscanerServicio;