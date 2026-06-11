import TipoProductoServicio from "../../TipoProducto/Aplicacion/TipoProductoServicio.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import TipoStockServicio from "../Aplicacion/TipoStockServicio.js";
import TipoStockListaVista from "./TipoStockListaVista.js";

class TipoStockABM {
    archivo = "./TipoStock/Vista/TipoStockABM.html";
    ids = {
        operacionTipoStock : "operacionTipoStock",
        divOpTipoStock : "divOpTipoStock",
        txtDescripcionTipoStock : "txtDescripcionTipoStock",
        divErroresTipoStock : "divErroresTipoStock",
        btnOpTipoStock : "btnOpTipoStock",
        btnModTipoStock : "btnModTipoStock",
        btnElimTipoStock : "btnElimTipoStock"
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
        if (this.operacion === this.operaciones.crear) {
            this.ocultarBotones();
        }
    }

    cargarFunciones(){
        let esto = this;
        let btnOp = document.getElementById(this.ids.btnOpTipoStock);
        this.setButtonOperation();
        btnOp.onclick = function() {
            esto.btnOpTipoStockOnClick();
        };
        let btnMod = document.getElementById(this.ids.btnModTipoStock);
        btnMod.onclick = function() {
            esto.btnModTipoStockOnClick();
        };
        let btnElim = document.getElementById(this.ids.btnElimTipoStock);
        btnElim.onclick = function() {
            esto.btnElimTipoStockOnClick();
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
            descripcion.disabled = true;
            this.ocultarBtnOp();
        }
    }

    bloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoStock);
        descripcion.disabled = true;
    }

    desbloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoStock);
        descripcion.disabled = false;
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

    btnModTipoStockOnClick(){
        this.operacion = this.operaciones.modificar;
        this.setButtonOperation();
        this.desbloquearCampos();
        this.mostrarbtnOp();
    }

    btnElimTipoStockOnClick(){
        this.operacion = this.operaciones.eliminar;
        this.setButtonOperation();
        this.bloquearCampos();
        this.mostrarbtnOp();
    }

    setButtonOperation(){
        let btnOp = document.getElementById(this.ids.btnOpTipoStock);
        btnOp.innerHTML = this.operacion;
    }

    ocultarBtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpTipoStock);
        btnOp.style.display = "none";
    }

    mostrarbtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpTipoStock);
        btnOp.style.display = "inline-block";
        btnOp.className = "btnRelleno cabecera";
    }

    ocultarBotones(){
        let divBotones = document.getElementById(this.ids.divOpTipoStock);
        divBotones.style.display = "none";
    }

    mostrarBotones(){
        let divBotones = document.getElementById(this.ids.divErroresTipoStock);
        divBotones.className = "divEspaciado marginBotton10";
    }
}

export default TipoStockABM;