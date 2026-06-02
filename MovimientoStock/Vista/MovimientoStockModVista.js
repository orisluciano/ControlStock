/*import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Usuario from "../Aplicacion/Usuario.js";
import UsuarioServicio from "../Aplicacion/UsuarioServicio.js";*/

import ModalBase from "../../Utiles/Modal/ModalBase.js";
import MovimientoStockServicio from "../Aplicacion/MovimientoStockServicio.js";

class MovimientoStockModVista {
    archivo = "./MovimientoStock/Vista/MovimientoStockModVista.html";
    ids = {
        txtCantidadMov : "txtCantidadMov",
        slcTipoMov : "slcTipoMov",
        slcMotivoMov : "slcMotivoMov",
        divErroresMov : "divErroresMov",
        btnMovNuevo : "btnMovNuevo"
    };
    /*userService = new UsuarioServicio();
    operaciones = new Operaciones();
    operacion = null;
    usuario = null;
    userSend = new Usuario();*/
    movimiento = {};
    stockId = null;
    movService = new MovimientoStockServicio();

    constructor(stockId) {
        this.stockId = stockId;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        let modal = new ModalBase();
        await modal.abrirModal(vista);
        this.cargarFunciones();
        //this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevo = document.getElementById(this.ids.btnMovNuevo);
        btnNuevo.onclick = function(params) {
            esto.btnNuevoMovOnclick();
        };
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionUser);
        operacion.innerHTML = "";
        operacion.innerHTML = this.operacion + " usuario";
        if (this.operacion != this.operaciones.crear) {
            let nombre = document.getElementById(this.ids.txtUserABM);
            nombre.innerHTML = "";
            nombre.value = this.usuario.usuario;
            nombre.disabled = true;
            let mail = document.getElementById(this.ids.txtMailUser);
            mail.value = this.usuario.mail;
            mail.disabled = true;
            let bloqueado = document.getElementById(this.ids.txtBloqUser);
            bloqueado.value = this.usuario.bloqueado;   
        }
    }

    async btnNuevoMovOnclick(){
        let mensaje = "¿Desea crear este movimiento de stock?";
        let base = null;
        let cant = document.getElementById(this.ids.txtCantidadMov);
        let tipo = document.getElementById(this.ids.slcTipoMov);
        let motivo = document.getElementById(this.ids.slcMotivoMov);
        this.movimiento.stockId = this.stockId;
        this.movimiento.cantidad = cant.value;
        this.movimiento.tipo = tipo.value;
        this.movimiento.motivoMovId = motivo.value;
        if (confirm(mensaje)) {
            base = await this.movService.nuevoMov(this.movimiento);
            if (base.mensajes.lenght > 0) {
                alert(base.mensajes[0]);
            } else {
                let divErrores = document.getElementById(this.ids.divErroresMov);
                divErrores.innerHTML = "";
                alert("Hubo un error...");
                base.errores.forEach(e => {
                    let error = document.createElement("span");
                    error.innerHTML = e;
                    divErrores.appendChild(error);
                });
            }
        }
    }
}
export default MovimientoStockModVista;