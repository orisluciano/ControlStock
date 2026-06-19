import TipoProductoServicio from "../../TipoProducto/Aplicacion/TipoProductoServicio.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import TipoProductoListaVista from "./TipoProductoListaVista.js";

class TipoProductoABM {
    archivo = "./TipoProducto/Vista/TipoProductoABM.html";
    ids = {
        operacionTipoProd : "operacionTipoProd",
        divOpTipoProd : "divOpTipoProd",
        txtDescripcionTipoProd : "txtDescripcionTipoProd",
        divErroresTipoProd : "divErroresTipoProd",
        btnOpTipoProd : "btnOpTipoProd",
        btnModTipoProd : "btnModTipoProd",
        btnElimTipoProd : "btnElimTipoProd"
    };
    tipoProdService = new TipoProductoServicio();
    modal = new ModalBase();
    operaciones = new Operaciones();
    tipoProd = {};
    operacion = null;

    constructor(operacion, tipoProd) {
        this.tipoProd = tipoProd;
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
        let btnOp = document.getElementById(this.ids.btnOpTipoProd);
        this.setButtonOperation();
        btnOp.onclick = function() {
            esto.btnOpTipoProdOnClick();
        };
        let btnMod = document.getElementById(this.ids.btnModTipoProd);
        btnMod.onclick = function() {
            esto.btnModTipoProdOnClick();
        };
        let btnElim = document.getElementById(this.ids.btnElimTipoProd);
        btnElim.onclick = function() {
            esto.btnElimTipoProdOnClick();
        };
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionTipoProd);
        operacion.innerHTML = "";
        operacion.innerHTML = this.operacion + " tipo de producto";
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoProd);
        if (this.operacion != this.operaciones.crear) {
            descripcion.innerHTML = "";
            descripcion.value = this.tipoProd.descripcion;
            descripcion.disabled = true;
            this.ocultarBtnOp();
        }
    }

    bloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoProd);
        descripcion.disabled = true;
    }

    desbloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionTipoProd);
        descripcion.disabled = false;
    }

    async btnOpTipoProdOnClick(){
        let txtDescrip = document.getElementById(this.ids.txtDescripcionTipoProd);
        this.tipoProd.descripcion = txtDescrip.value;
        let base = null;
        if (this.operacion === this.operaciones.crear) {
            base = await this.tipoProdService.nuevo(this.tipoProd);   
        }
        if (this.operacion === this.operaciones.modificar) {
            base = await this.tipoProdService.modificar(this.tipoProd);   
        }
        if (this.operacion === this.operaciones.eliminar) {
            base = await this.tipoProdService.eliminar(this.tipoProd);   
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
            let lista = new TipoProductoListaVista();
            lista.cargarVista();
        }
    }

    btnModTipoProdOnClick(){
        this.operacion = this.operaciones.modificar;
        this.setButtonOperation();
        this.desbloquearCampos();
        this.mostrarbtnOp();
    }

    btnElimTipoProdOnClick(){
        this.operacion = this.operaciones.eliminar;
        this.setButtonOperation();
        this.bloquearCampos();
        this.mostrarbtnOp();
    }

    setButtonOperation(){
        let btnOp = document.getElementById(this.ids.btnOpTipoProd);
        btnOp.innerHTML = this.operacion;
    }

    ocultarBtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpTipoProd);
        btnOp.style.display = "none";
    }

    mostrarbtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpTipoProd);
        btnOp.style.display = "inline-block";
        btnOp.className = "btnRelleno cabecera";
    }

    ocultarBotones(){
        let divBotones = document.getElementById(this.ids.divOpTipoProd);
        divBotones.style.display = "none";
    }

    mostrarBotones(){
        let divBotones = document.getElementById(this.ids.divErroresTipoProd);
        divBotones.className = "divEspaciado marginBotton10";
    }
}

export default TipoProductoABM;