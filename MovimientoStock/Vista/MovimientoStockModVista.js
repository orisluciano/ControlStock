/*import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Usuario from "../Aplicacion/Usuario.js";
import UsuarioServicio from "../Aplicacion/UsuarioServicio.js";*/

import MotivoServicio from "../../Motivo/Aplicacion/MotivoServicio.js";
import ProductoABM from "../../Producto/Vista/ProductoABM.js";
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
    modal = new ModalBase();
    movimiento = {};
    stockId = null;
    movService = new MovimientoStockServicio();
    motivoService = new MotivoServicio();
    motivos = null;
    producto = null;

    constructor(stockId, producto) {
        this.stockId = stockId;
        this.producto = producto;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        await this.modal.abrirModal(vista);
        this.cargarFunciones();
        await this.cargarMotivos();
        this.cargarSlcMotivos("Entrada");
        //this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevo = document.getElementById(this.ids.btnMovNuevo);
        btnNuevo.onclick = function(params) {
            esto.btnNuevoMovOnclick();
        };
        let slcTipo = document.getElementById(this.ids.slcTipoMov);
        slcTipo.onchange = function(params) {
            esto.slcTipoMovOnclick();  
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

    async cargarMotivos(){
        let base = await this.motivoService.getMotivos();
        if (base.errores.length > 0) {
            alert("No se cargaron los motivos de movimientos");
        }else{
            this.motivos = base.respuesta;
        }
    }

    cargarSlcMotivos(tipo){
        if (this.motivos.length > 0) {
            let slcMotivos = document.getElementById(this.ids.slcMotivoMov);
            slcMotivos.innerHTML = "";
            this.motivos.forEach(e => {
                if (e.tipo === tipo) {
                    let op = document.createElement("option");
                    op.value = e.id
                    op.innerHTML = e.descripcion;
                    slcMotivos.appendChild(op);
                }
            });   
        }else{
            alert("No hay motivos cargados");
        }
    }

    slcTipoMovOnclick(){
        let slc = document.getElementById(this.ids.slcTipoMov);
        this.cargarSlcMotivos(slc.value);
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
            if (base.mensajes.length > 0) {
                alert(base.mensajes[0]);
                this.modal.cerrarModal();
                let abm = new ProductoABM(null, this.producto);
                abm.cargarVista();
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