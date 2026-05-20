import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import ProductoVista from "./ProductoVista.js";
import ProductoServicio from "../Aplicacion/ProductoServicio.js";
import Producto from "../Aplicacion/Producto.js";
import PrecioHistoriaVista from "../../Precio/Vista/PrecioHistorialVista.js";
import PrecioServicio from "../../Precio/Aplicacion/PrecioServicio.js";
import PrecioNuevo from "../../Precio/Vista/PrecioNuevo.js";
import MovimientoStockHistorialVista from "../../MovimientoStock/Vista/MovimientoStockHistorialVista.js";
import MovimientoStockModVista from "../../MovimientoStock/Vista/MovimientoStockModVista.js";
import StockServicio from "../../Stock/Aplicacion/StockServicio.js";
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
        btnElimProd : "btnElimProd",
        btnCancelProd : "btnCancelProd"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    operacion = null;
    producto = null;
    precio = null;
    productoSend = new Producto();
    prodService = new ProductoServicio();
    precioService = new PrecioServicio();
    stockService = new StockServicio();

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
        await this.cargarPrecio();
        await this.cargarStock();
        this.mostrarDatos();
    }

    async cargarPrecio(){
        let res = await this.precioService.getUltimoPrecio(this.producto.id);
        let txtCosto = document.getElementById(this.ids.txtPrecioCosto);
        txtCosto.value = "";
        let txtVenta = document.getElementById(this.ids.txtPrecioVenta);
        txtVenta.value = "";
        if (res.errores.length > 0) {
            let mensajes = "";
            res.errores.forEach(e => {
                mensajes = mensajes + e;
            });
            txtCosto.value = mensajes;
        }else{
            txtCosto.value = "Costo: $" + res.respuesta.resultados[0].costo;
            txtVenta.value = "Venta: $" + res.respuesta.resultados[0].venta;
        }
    }

    async cargarStock(){
        let res = await this.stockService.getByProductoId(this.producto.id);
        let txtStock = document.getElementById(this.ids.txtStockProd);
        txtStock.value = "";
        if (res.errores.length > 0) {
            let mensajes = "";
            res.errores.forEach(e => {
                mensajes = mensajes + e;
            });
            txtStock.value = mensajes
        }else{
            txtStock.value = res.respuesta[0].actual + " " + res.respuesta[0].tipoStockId + " Minimo: " + res.respuesta[0].minimo + " Maximo: " + res.respuesta[0].maximo;
        }
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
        let btnCancelProd = document.getElementById(this.ids.btnCancelProd);
        btnCancelProd.onclick = function(params) {
            esto.btnCancelProdOnClick();
        };
        let btnModPrecio = document.getElementById(this.ids.btnModSPrecio);
        btnModPrecio.onclick = function(params) {
            esto.btnModSPrecioOnClick();
        };
        let btnHistPrecio = document.getElementById(this.ids.btnHistPrecio);
        btnHistPrecio.onclick = function(params) {
            esto.btnHistPrecioOnClick();
        };
        let btnModStock = document.getElementById(this.ids.btnModStock);
        btnModStock.onclick = function(params) {
            esto.btnModStockOnClick();
        };
        let btnMovStock = document.getElementById(this.ids.btnMovsStock);
        btnMovStock.onclick = function(params) {
            esto.btnMovsStockOnClick();
        }
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
            let btnCancel = document.getElementById(this.ids.btnCancelProd);
            btnCancel.style.display = "none";
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
            let btnCancel = document.getElementById(this.ids.btnCancelProd);
            btnCancel.style.display = "none";
            this.desbloquearBotones();
        }
    }

    async btnOpProdOnclick(){
        let mensaje = "¿Desea " + this.operacion + " este producto?";
        let base = null;
        if (confirm(mensaje)) {
            this.productoSend.id = this.producto.id;
            let txtNombre = document.getElementById(this.ids.txtNomProd);
            this.productoSend.nombre = txtNombre.value;
            let txtDescrip = document.getElementById(this.ids.txtDescProd);
            this.productoSend.descripcion = txtDescrip.value;
            let txtCod = document.getElementById(this.ids.txtCodProd);
            this.productoSend.codSKU = txtCod.value;
            let slcTipo = document.getElementById(this.ids.slcTipoProd);
            this.productoSend.tipoProductoId = slcTipo.value;
            switch (this.operacion) {
                case this.operaciones.crear:
                    base = await this.prodService.nuevo(this.productoSend);
                    break;
                case this.operaciones.modificar:
                    base = await this.prodService.modificar(this.productoSend);
                    break;
                case this.operaciones.eliminar:
                    base = await this.prodService.eliminar(this.productoSend);
                    break;
                default:
                    break;
            }
            if (base.errores.lenght > 0) {
                let divErrores = document.getElementById(this.ids.divErroresProd);
                divErrores.innerHTML = "";
                alert("Hubo un error...");
                base.errores.forEach(e => {
                    let error = document.createElement("span");
                    error.innerHTML = e;
                    divErrores.appendChild(error);
                });
            }
            if (base.mensajes.length > 0) {
                alert(base.mensajes[0]);
                switch (this.operacion) {
                    case this.operaciones.crear:
                        this.irLista();
                        break;
                    case this.operaciones.modificar:
                        this.bloquearInputs();
                        this.operacion = this.operaciones.ver;
                        break;
                    case this.operaciones.eliminar:
                        this.irLista();
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

    async btnElimProdOnClick(){
        let borrar = confirm("¿Desea eliminar este producto?");
        if (borrar) {
            this.productoSend.id = this.producto.id;
            let base = await this.prodService.eliminar(this.productoSend);
            if (base.errores.lenght > 0) {
                base.errores.forEach(e => {
                    alert(e);
                });
            }
            if (base.mensajes.length > 0) {
                base.mensajes.forEach(e =>{ alert(e); });
                this.irLista();
            }
        }
    }

    btnCancelProdOnClick(){
        this.operacion = this.operaciones.ver;
        this.bloquearInputs();
    }

    btnModSPrecioOnClick(){
        let precioNuevo = new PrecioNuevo(this.producto);
        precioNuevo.cargarVista();
    }

    btnHistPrecioOnClick(){
        let precioHist = new PrecioHistoriaVista(this.producto.id);
        precioHist.cargarVista();
    }

    btnModStockOnClick(){
        let modStock = new MovimientoStockModVista();
        modStock.cargarVista();
    }

    btnMovsStockOnClick(){
        let movHist = new MovimientoStockHistorialVista();
        movHist.cargarVista();
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
        let btnCancel = document.getElementById(this.ids.btnCancelProd);
        btnCancel.style.display = "none";
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
        let btnCancel = document.getElementById(this.ids.btnCancelProd);
        btnCancel.style.display = "block";
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