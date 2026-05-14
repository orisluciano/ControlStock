/*import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Usuario from "../Aplicacion/Usuario.js";
import UsuarioServicio from "../Aplicacion/UsuarioServicio.js";*/

import ModalBase from "../../Utiles/Modal/ModalBase.js";

class PrecioNuevo {
    archivo = "./Precio/Vista/PrecioNuevo.html";
    ids = {
        operacionUser : "operacionUser",
        btnOpUser : "btnOpUser",
        txtUserABM : "txtUserABM",
        txtBloqUser : "txtBloqUser",
        txtMailUser : "txtMailUser",
        divErroresUser : "divErroresUser"
    };
    /*userService = new UsuarioServicio();
    operaciones = new Operaciones();
    operacion = null;
    usuario = null;
    userSend = new Usuario();*/

    constructor(operacion, usuario) {
        this.operacion = operacion
        this.usuario = usuario;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        let modal = new ModalBase();
        await modal.abrirModal(vista);
        //this.cargarFunciones();
        //this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnOpUser = document.getElementById(this.ids.btnOpUser);
        btnOpUser.innerHTML = this.operacion;
        btnOpUser.onclick = function(params) {
            esto.btnOpUserOnclick();
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

    async btnOpUserOnclick(){
        let mensaje = "¿Desea " + this.operacion + " este usuario?";
        let base = null;
        if (confirm(mensaje)) {
            switch (this.operacion) {
                case this.operaciones.crear:
                    base = await this.userService.nuevo(this.userSend);
                    break;
                case this.operaciones.modificar:
                    base = await this.userService.modificar(this.userSend);
                    break;
                case this.operaciones.eliminar:
                    base = await this.userService.eliminar(this.userSend);
                    break;
                default:
                    break;
            }
            if (base.mensajes.lenght > 0) {
                alert(base.mensajes[0]);
            } else {
                let divErrores = document.getElementById(this.ids.divErroresUser);
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
export default PrecioNuevo;