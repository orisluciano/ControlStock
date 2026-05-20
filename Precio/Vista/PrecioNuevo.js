import ProductoABM from "../../Producto/Vista/ProductoABM.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Precio from "../Aplicacion/Precio.js";
import PrecioServicio from "../Aplicacion/PrecioServicio.js";

class PrecioNuevo {
    archivo = "./Precio/Vista/PrecioNuevo.html";
    ids = {
        txtPrecioCostoNuevo : "txtPrecioCostoNuevo",
        txtPrecioVentaNuevo : "txtPrecioVentaNuevo",
        divErroresPrecio : "divErroresPrecio",
        btnPrecioNuevo : "btnPrecioNuevo"
    };
    precio = new Precio();
    precioServicio = new PrecioServicio();
    modal = new ModalBase();
    producto = null;

    constructor(producto) {
        this.precio.productoId = producto.id
        this.producto = producto;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        //let modal = new ModalBase();
        await this.modal.abrirModal(vista);
        this.cargarFunciones();
        //this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevo = document.getElementById(this.ids.btnPrecioNuevo);
        btnNuevo.onclick = function(params) {
            esto.btnPrecioNuevoOnClick();
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

    async btnPrecioNuevoOnClick(){
        let txtCosto = document.getElementById(this.ids.txtPrecioCostoNuevo);
        this.precio.costo = txtCosto.value;
        let txtVenta = document.getElementById(this.ids.txtPrecioVentaNuevo);
        this.precio.venta = txtVenta.value;
        let base = await this.precioServicio.nuevo(this.precio);
        if (base.errores.length > 0) {
            base.errores.forEach(e => {
                alert(e);
            });
        } else {
            base.mensajes.forEach(e => {
                alert(e);
            });
            this.modal.cerrarModal();
            let abm = new ProductoABM(null, this.producto);
            abm.cargarVista();
        }
    }
}
export default PrecioNuevo;