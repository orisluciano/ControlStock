import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import ProductoVista from "./ProductoVista.js";
//import Usuario from "../Aplicacion/Usuario.js";
//import UsuarioServicio from "../Aplicacion/UsuarioServicio.js";

class ProductoABM {
    archivo = "./Producto/Vista/ProductoABM.html";
    ids = {
        operacionProd : "operacionProd",
        btnOpProd : "btnOpProd",
        divErroresProd : "divErroresProd",
        btnVolverProd : "btnVolverProd",
        txtImgProd : "txtImgProd",
        txtNomProd : "txtNomProd",
        txtDescProd : "txtDescProd",
        txtCodProd : "txtCodProd",
        slcTipoProd : "slcTipoProd",
        txtPrecioCosto : "txtPrecioCosto",
        txtPrecioVenta : "txtPrecioVenta",
        btnModSPrecio : "btnModSPrecio",
        btnHistPrecio : "btnHistPrecio",
        txtStockProd : "txtStockProd",
        btnModStock : "btnModStock",
        btnMovsStock : "btnMovsStock"
    };
    //userService = new UsuarioServicio();
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    operacion = null;
    usuario = null;
    //userSend = new Usuario();

    constructor(operacion, usuario) {
        this.operacion = operacion
        this.usuario = usuario;
    }

    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        root.innerHTML = res;
        this.cargarFunciones();
        this.mostrarDatos();
    }

    cargarFunciones(){
        let esto = this;
        let btnOpProd = document.getElementById(this.ids.btnOpProd);
        btnOpProd.innerHTML = this.operacion;
        btnOpProd.onclick = function(params) {
            esto.btnOpProdOnclick();
        };
        let btnVolver = document.getElementById(this.ids.btnVolverProd);
        btnVolver.onclick = function(params) {
            esto.btnVolverProdOnClick();
        }
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionProd);
        operacion.innerHTML = "";
        operacion.innerHTML = this.operacion + " producto";
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

    async btnOpProdOnclick(){
        let mensaje = "¿Desea " + this.operacion + " este producto?";
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

    btnVolverProdOnClick(){
        let lista = new ProductoVista();
        lista.cargarVista();
    }
}
export default ProductoABM;