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
        btnMovsStock : "btnMovsStock",
        divPrecio : "divPrecio",
        divStock : "divStock",
        btnModProd : "btnModProd",
        btnElimProd : "btnElimProd"
    };
    //userService = new UsuarioServicio();
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    operacion = null;
    producto = null;
    //userSend = new Usuario();

    constructor(operacion, producto) {
        this.operacion = operacion
        this.producto = producto;
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
        };
        let btnMod = document.getElementById(this.ids.btnModProd);
        btnMod.onclick = function(params) {
            esto.btnModProdOnClick();
        };
        let btnElim = document.getElementById(this.ids.btnElimProd);
        btnElim.onclick= function(params) {
            esto.btnElimProdOnClick();
        };
    }

    mostrarDatos(){
        let operacion = document.getElementById(this.ids.operacionProd);
        operacion.innerHTML = "";
        operacion.innerHTML = this.operacion + " producto";
        if (this.operacion === this.operaciones.crear) {
            let divPrecio = document.getElementById(this.ids.divPrecio);
            divPrecio.style.display = "none";
            let divStock = document.getElementById(this.ids.divStock);
            divStock.style.display = "none";
            this.bloquearBotones();
        }
        if (this.operacion === this.operaciones.eliminar || this.operacion === this.operaciones.ver) {
            let nombre = document.getElementById(this.ids.txtNomProd);
            nombre.innerHTML = "";
            nombre.value = this.producto.nombre;
            nombre.disabled = true;
            let descripcion = document.getElementById(this.ids.txtDescProd);
            descripcion.value = this.producto.descripcion;
            descripcion.disabled = true;
            let codigo = document.getElementById(this.ids.txtCodProd);
            codigo.value = this.producto.codSKU; 
            codigo.disabled = true;
            let tipoProd = document.getElementById(this.ids.slcTipoProd);
            tipoProd.value = this.producto.tipoProdId
            tipoProd.innerHTML = this.producto.tipoProdId;
            tipoProd.disabled = true;
            let btnOp = document.getElementById(this.ids.btnOpProd);
            btnOp.style.display = "none";
            this.desbloquearBotones();
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
            if (base.mensajes.lenght > 0) {
                switch (this.operacion) {
                    case this.operaciones.crear:
                        alert("Voy a cerrar la ventana");
                        this.irLista();
                        break;
                    case this.operaciones.modificar:
                        this.bloquearInputs();
                        this.operacion = this.operaciones.ver;
                        break;
                    case this.operaciones.eliminar:
                        alert("Voy a cerrar la ventana");
                        break;
                    default:
                        break;
                }
            }
        }
    }

    btnVolverProdOnClick(){
        let lista = new ProductoVista();
        lista.cargarVista();
    }

    btnModProdOnClick(){
        this.desbloquearInputs();
        this.operacion = this.operaciones.modificar;
        let btnOp = document.getElementById(this.ids.btnOpProd);
        btnOp.innerHTML = this.operacion;
    }

    btnElimProdOnClick(){
        let borrar = confirm("¿Desea eliminar este producto?");
        if (borrar) {
            alert("El producto fue eliminado.");
            this.irLista();
        }
    }


    bloquearInputs(){
        let nombre = document.getElementById(this.ids.txtNomProd);
        nombre.innerHTML = "";
        nombre.value = this.producto.nombre;
        nombre.disabled = true;
        let descripcion = document.getElementById(this.ids.txtDescProd);
        descripcion.value = this.producto.descripcion;
        descripcion.disabled = true;
        let codigo = document.getElementById(this.ids.txtCodProd);
        codigo.value = this.producto.codSKU; 
        codigo.disabled = true;
        let tipoProd = document.getElementById(this.ids.slcTipoProd);
        tipoProd.value = this.producto.tipoProdId
        tipoProd.innerHTML = this.producto.tipoProdId;
        tipoProd.disabled = true;
        let btnOp = document.getElementById(this.ids.btnOpProd);
        btnOp.style.display = "none";
    }

    desbloquearInputs(){
        let nombre = document.getElementById(this.ids.txtNomProd);
        nombre.disabled = false;
        let descripcion = document.getElementById(this.ids.txtDescProd);
        descripcion.disabled = false;
        let codigo = document.getElementById(this.ids.txtCodProd); 
        codigo.disabled = false;
        let tipoProd = document.getElementById(this.ids.slcTipoProd);
        tipoProd.disabled = false;
        let btnOp = document.getElementById(this.ids.btnOpProd);
        btnOp.style.display = "block";
    }

    bloquearBotones(){
        let btnMod = document.getElementById(this.ids.btnModProd);
        btnMod.style.display = "none";
        let btnElim = document.getElementById(this.ids.btnElimProd);
        btnElim.style.display = "none";
    }

    desbloquearBotones(){
        let btnMod = document.getElementById(this.ids.btnModProd);
        btnMod.disabled = false;
        let btnElim = document.getElementById(this.ids.btnElimProd);
        btnElim.disabled = false;
    }

    irLista(){
        let lista = new ProductoVista();
        lista.cargarVista();
    }
}
export default ProductoABM;