import TipoProductoServicio from "../../TipoProducto/Aplicacion/TipoProductoServicio.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import TipoStockServicio from "../Aplicacion/TipoStockServicio.js";
import TipoStockListaVista from "./TipoStockListaVista.js";

class TipoStockABM {
    archivo = "./TipoStock/Vista/TipoStockABM.html";
    ids = {
        operacionTipoStock : "operacionTipoStock",
        txtDescripcionTipoStock : "txtDescripcionTipoStock",
        divErroresTipoStock : "divErroresTipoStock",
        btnOpTipoStock : "btnOpTipoStock"
    };
    tipoStockService = new TipoStockServicio();
    modal = new ModalBase();
    operaciones = new Operaciones();
    tipoStock = {};
    operacion = null;

    constructor(operacion, tipoStock) {
        this.tipoStock = tipoStock;
        this.operacion = operacion;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        await this.modal.abrirModal(vista);
        this.cargarFunciones();
        this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnOp = document.getElementById(this.ids.btnOpTipoStock);
        btnOp.onclick = function(params) {
            esto.btnOpTipoStockOnClick();
        };
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionTipoStock);
        operacion.innerHTML = "";
        operacion.innerHTML = this.operacion + " tipo de stock";
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoStock);
        if (this.operacion != this.operaciones.crear) {
            descripcion.innerHTML = "";
            descripcion.value = this.tipoStock.descripcion;  
        }
        if (this.operacion === this.operaciones.eliminar) {
            descripcion.disabled = true;
        }
    }

    async btnOpTipoStockOnClick(){
        let txtDescrip = document.getElementById(this.ids.txtDescripcionTipoStock);
        this.tipoStock.descripcion = txtDescrip.value;
        let base = null;
        if (this.operacion === this.operaciones.crear) {
            base = await this.tipoStockService.nuevo(this.tipoStock);   
        }
        if (this.operacion === this.operaciones.modificar) {
            base = await this.tipoStockService.modificar(this.tipoStock);   
        }
        if (this.operacion === this.operaciones.eliminar) {
            base = await this.tipoStockService.eliminar(this.tipoStock);   
        }
        if (base.errores.length > 0) {
            base.errores.forEach(e => {
                alert(e);
            });
        } else {
            base.mensajes.forEach(e => {
                alert(e);
            });
            this.modal.cerrarModal();
            let lista = new TipoStockListaVista();
            lista.cargarVista();
        }
    }
}

export default TipoStockABM;