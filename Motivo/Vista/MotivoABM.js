import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import MotivoServicio from "../Aplicacion/MotivoServicio.js";
import MotivoListaVista from "./MotivoListaVista.js";

class MotivoABM {
    archivo = "./Motivo/Vista/MotivoABM.html";
    ids = {
        operacionMotivo : "operacionMotivo",
        divOpMotivo : "divOpMotivo",
        txtDescripcionMotivo : "txtDescripcionMotivo",
        divErroresMotivo : "divErroresMotivo",
        btnOpMotivo : "btnOpMotivo",
        btnModMotivo : "btnModMotivo",
        btnElimMotivo : "btnElimMotivo",
        slcTipoMotivo : "slcTipoMotivo"
    };
    motivoService = new MotivoServicio();
    modal = new ModalBase();
    operaciones = new Operaciones();
    motivo = {};
    operacion = null;

    constructor(operacion, motivo) {
        this.motivo = motivo;
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
        let btnOp = document.getElementById(this.ids.btnOpMotivo);
        this.setButtonOperation();
        btnOp.onclick = function() {
            esto.btnOpMotivoOnClick();
        };
        let btnMod = document.getElementById(this.ids.btnModMotivo);
        btnMod.onclick = function() {
            esto.btnModMotivoOnClick();
        };
        let btnElim = document.getElementById(this.ids.btnElimMotivo);
        btnElim.onclick = function() {
            esto.btnElimMotivoOnClick();
        };
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionMotivo);
        operacion.innerHTML = "";
        let descripcion = document.getElementById(this.ids.txtDescripcionMotivo);
        if (this.operacion != this.operaciones.crear) {
            operacion.innerHTML = this.motivo.descripcion;
            descripcion.innerHTML = "";
            descripcion.value = this.motivo.descripcion;
            descripcion.disabled = true;
            let slc = document.getElementById(this.ids.slcTipoMotivo);
            let opciones = Array.from(slc.options);
            opciones.forEach( e => {
                if (e.text===this.motivo.tipo) {
                    e.selected = true;
                }
            });
            this.bloquearCampos();
            this.ocultarBtnOp();
        }else{
            operacion.innerHTML = this.operaciones.crear + " motivo de movimiento";
        }
    }

    bloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionMotivo);
        descripcion.disabled = true;
        let slc = document.getElementById(this.ids.slcTipoMotivo);
        slc.disabled = true;
    }

    desbloquearCampos(){
        let descripcion = document.getElementById(this.ids.txtDescripcionMotivo);
        descripcion.disabled = false;
        let slc = document.getElementById(this.ids.slcTipoMotivo);
        slc.disabled = false;
    }

    async btnOpMotivoOnClick(){
        let txtDescrip = document.getElementById(this.ids.txtDescripcionMotivo);
        let slc = document.getElementById(this.ids.slcTipoMotivo);
        this.motivo.descripcion = txtDescrip.value;
        this.motivo.tipo = slc.value;
        let base = null;
        if (this.operacion === this.operaciones.crear) {
            base = await this.motivoService.nuevo(this.motivo);   
        }
        if (this.operacion === this.operaciones.modificar) {
            base = await this.motivoService.modificar(this.motivo);   
        }
        if (this.operacion === this.operaciones.eliminar) {
            base = await this.motivoService.eliminar(this.motivo);   
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
            let lista = new MotivoListaVista();
            lista.cargarVista();
        }
    }

    btnModMotivoOnClick(){
        this.operacion = this.operaciones.modificar;
        this.setButtonOperation();
        this.desbloquearCampos();
        this.mostrarbtnOp();
    }

    btnElimMotivoOnClick(){
        this.operacion = this.operaciones.eliminar;
        this.setButtonOperation();
        this.bloquearCampos();
        this.mostrarbtnOp();
    }

    setButtonOperation(){
        let btnOp = document.getElementById(this.ids.btnOpMotivo);
        btnOp.innerHTML = this.operacion;
    }

    ocultarBtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpMotivo);
        btnOp.style.display = "none";
    }

    mostrarbtnOp(){
        let btnOp = document.getElementById(this.ids.btnOpMotivo);
        btnOp.style.display = "inline-block";
        btnOp.className = "btnRelleno cabecera";
    }

    ocultarBotones(){
        let divBotones = document.getElementById(this.ids.divOpMotivo);
        divBotones.style.display = "none";
    }

    mostrarBotones(){
        let divBotones = document.getElementById(this.ids.divErroresMotivo);
        divBotones.className = "divEspaciado marginBotton10";
    }
}

export default MotivoABM;