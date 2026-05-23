import ProductoABM from "../../Producto/Vista/ProductoABM.js";
import TipoStockServicio from "../../TipoStock/Aplicacion/TipoStockServicio.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Stock from "../Aplicacion/Stock.js";
import StockServicio from "../Aplicacion/StockServicio.js";

class StockConfigVista {
    archivo = "./Stock/Vista/StockConfigVista.html";
    ids = {
        operacionStockConfig : "operacionStockConfig",
        txtStockMinimo : "txtStockMinimo",
        txtStockMaximo : "txtStockMaximo",
        slcTipoStock : "slcTipoStock",
        divErroresStockConfig : "divErroresStockConfig",
        btnOpStockConfig : "btnOpStockConfig"
    };
    operaciones = new Operaciones();
    operacion = null;
    stock = null;
    producto = null;
    stockService = new StockServicio();
    stockSend = new Stock();
    modal = new ModalBase();
    tipoStockService = new TipoStockServicio();

    constructor(stock, producto) {
        this.stock = stock;
        this.producto = producto;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        await this.modal.abrirModal(vista);
        this.mostrarDatos();
        this.cargarFunciones();
        await this.cargarSlcTipoStock();
    }

    cargarFunciones(){
        let esto = this;
        let btnOpStock = document.getElementById(this.ids.btnOpStockConfig);
        btnOpStock.innerHTML = this.operacion;
        btnOpStock.onclick = function(params) {
            esto.btnOpStockConfig();
        };
    }

    mostrarDatos(){
        let mensaje = " configuracion de stock";
        let operacion = document.getElementById(this.ids.operacionStockConfig);
        operacion.innerHTML = "";
        let btn = document.getElementById(this.ids.btnOpStockConfig);
        btn.innerHTML = "";
        if (this.stock !== null) {
            operacion.innerHTML = this.operaciones.modificar + mensaje;
            let minimo = document.getElementById(this.ids.txtStockMinimo);
            minimo.value = this.stock.minimo;
            let maximo = document.getElementById(this.ids.txtStockMaximo);
            maximo.value = this.stock.maximo;
            let tipo = document.getElementById(this.ids.slcTipoStock);
            tipo.value = this.stock.tipoStockId;
            tipo.innerHTML = this.stock.tipoStockId;
            btn.innerHTML = this.operaciones.modificar;
            this.operacion = this.operaciones.modificar;
        } else {
            operacion.innerHTML = this.operaciones.crear + mensaje;
            btn.innerHTML = this.operaciones.crear;
            this.operacion = this.operaciones.crear;
        }
        /*if (this.operacion != this.operaciones.crear) {
            let nombre = document.getElementById(this.ids.txtUserABM);
            nombre.innerHTML = "";
            nombre.value = this.usuario.usuario;
            nombre.disabled = true;
            let mail = document.getElementById(this.ids.txtMailUser);
            mail.value = this.usuario.mail;
            mail.disabled = true;
            let bloqueado = document.getElementById(this.ids.txtBloqUser);
            bloqueado.value = this.usuario.bloqueado;   
        }*/
    }

    async cargarSlcTipoStock(){
        let slcTipoStock = document.getElementById(this.ids.slcTipoStock);
        let res = await this.tipoStockService.getTodo();
        if (res.errores.length > 0) {
            let error = document.createElement("option");
            error.innerHTML = res.errores[0];
            slcTipoStock.appendChild(error);
        }else{
            res.resultados.forEach(e => {
                let opcion = document.createElement("option");
                opcion.innerHTML = e.descripcion;
                opcion.value = e.id;
                slcTipoStock.appendChild(opcion);
            });
        }
    }

    async btnOpStockConfig(){
        let mensaje = "¿Desea " + this.operacion + " esta configuracion de stock?";
        let base = null;
        if (confirm(mensaje)) {
            let minimo = document.getElementById(this.ids.txtStockMinimo);
            this.stockSend.minimo = minimo.value;
            let maximo = document.getElementById(this.ids.txtStockMaximo);
            this.stockSend.maximo = maximo.value;
            let tipo = document.getElementById(this.ids.slcTipoStock);
            this.stockSend.tipoStockId = tipo.value;
            this.stockSend.productoId = this.producto.id;
            switch (this.operacion) {
                case this.operaciones.crear:
                    base = await this.stockService.nuevo(this.stockSend);
                    break;
                case this.operaciones.modificar:
                    this.stockSend.id = this.stock.id;
                    this.stockSend.actual = this.stock.actual;
                    base = await this.stockService.modificar(this.stockSend);
                    break;
                case this.operaciones.eliminar:
                    break;
                default:
                    break;
            }
            if (base.mensajes.length > 0) {
                alert(base.mensajes[0]);
                this.modal.cerrarModal();
                let abm = new ProductoABM("ver", this.producto);
                abm.cargarVista();
            } else {
                let divErrores = document.getElementById(this.ids.divErroresStockConfig);
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
export default StockConfigVista;