import ProductoServicio from "../../Producto/Aplicacion/ProductoServicio.js";

class EscanerServicio {
    constructor() {
        
    }

    async buscarProducto(codigo, tipoCodigo){
        let respuesta = {
            encontrado : null,
            producto : null
        }
        let servicio = new ProductoServicio();
        let base = await servicio.getByCodigo(codigo, tipoCodigo);
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