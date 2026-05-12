import ModalBase from "../../Utiles/Modal/ModalBase.js";
import PrecioServicio from "../Aplicacion/PrecioServicio.js";

class PrecioHistoriaVista {
    archivo = "./Precio/Vista/PrecioHistorial.html";
    ids = {
        divTabla : "divTabla",
        tblPrecio : "tblPrecio",
        divPaginacion : "divPaginacion",
        txtDesde : "txtDesde",
        txtHasta : "txtHasta",
        btnBuscarPrecio : "btnBuscarPrecio"
    };
    productoId = null;
    precioServicio = new PrecioServicio();

    constructor(productoId) {
        this.productoId = productoId;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        let modal = new ModalBase();
        await modal.abrirModal(vista);
        this.cargarFunciones();
        
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscarPrecio);
        btnBuscar.onclick = function(params) {
            esto.btnBuscarPrecioOnClick();
        }
    }

    async mostrarDatos(){
        let respBase = await this.precioServicio.getPreciosById(null, null, null);
        console.log(respBase);
    }

    async btnBuscarPrecioOnClick(){
        await this.mostrarDatos();
    }
}
export default PrecioHistoriaVista;