import EscanerVista from "../Escaner/Vista/EscanerVista.js";
import Inicio from "../Inicio/Inicio.js";
import MotivoListaVista from "../Motivo/Vista/MotivoListaVista.js";
import ProductoVista from "../Producto/Vista/ProductoVista.js";
import TipoProductoListaVista from "../TipoProducto/Vista/TipoProductoListaVista.js";
import TipoStockListaVista from "../TipoStock/Vista/TipoStockListaVista.js";
import Formulario from "../Utiles/Formulario.js";
import Identificadores from "../Utiles/Identificadores.js";

class MenuVista {
    archivo = "./Menu/Menu.html";
    ids = { 
        contenidoMenu : "contenidoMenu",
        divMenu : "divMenu",
        btnStock :"btnStock",
        btnProducto : "btnProducto",
        btnTipoProducto : "btnTipoProducto",
        btnPrecio : "btnPrecio",
        btnMovimiento : "btnMovimiento",
        btnMotivo : "btnMotivo",
        btnTipoStock : "btnTipoStock",
        btnEscaner : "btnEscaner"
    };
    form = new Formulario();
    ident = new Identificadores();
    
    constructor(parameters) {
        
    }

    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let menu = document.getElementById(this.ident.contenidoMenu);
        menu.innerHTML = "";
        menu.innerHTML = res;
        let div = document.getElementById(this.ids.divMenu);
        div.className = "divMenu dropdown";
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnProducto = document.getElementById(this.ids.btnProducto);
        btnProducto.onclick = function() {
            esto.btnProductoOnClick();
        };
        let btnEscaner = document.getElementById(this.ids.btnEscaner);
        btnEscaner.onclick = function() {
            esto.btnEscanerOnClick();
        };
        let btnTipoStock = document.getElementById(this.ids.btnTipoStock);
        btnTipoStock.onclick = function() {
            esto.btnTipoStockOnClick();
        };
        let btnTipoProd = document.getElementById(this.ids.btnTipoProducto);
        btnTipoProd.onclick = function() {
            esto.btnTipoProductoOnClick();
        };
        let btnMotivo = document.getElementById(this.ids.btnMotivo);
        btnMotivo.onclick = function() {
            esto.btnMotivoOnclick();
        };
    }

    btnPerfilOnClick(){
        alert("Proximamente");
    }

    btnUsersOnClick(){
        let userLista = new UsuarioLista();
        userLista.cargarVista();
    }

    btnRubroOnClick(){
        alert("Proximamente");
    }

    btnSugerenciasOnClick(){
        alert("Proximamente");
    }

    btnTipoContactoOnClick(){
        alert("Proximamente");
    }

    btnTrabajadorOnClick(){
        alert("Proximamente");
    }

    btnTrabContactoOnClick(){
        alert("Proximamente");
    }

    btnTrabOpiOnClick(){
        alert("Proximamente");
    }

    btnTrabRubroOnClick(){
        alert("Proximamente");
    }

    btnConfigOnClick(){
        alert("Proximamente");
    }

    btnLogoutOnClick(){
        let loginService = new LoginServicio;
        loginService.logout();
        let inicio = new Inicio();
        inicio.iniciarApp();
    }

    btnProductoOnClick(){
        let prodVista = new ProductoVista();
        prodVista.cargarVista();
    }

    btnEscanerOnClick(){
        let escanerVista = new EscanerVista();
        escanerVista.cargarVista();
    }

    btnTipoStockOnClick(){
        let tipoStockVista = new TipoStockListaVista();
        tipoStockVista.cargarVista();
    }

    btnTipoProductoOnClick(){
        let tipoProdVista = new TipoProductoListaVista();
        tipoProdVista.cargarVista();
    }

    btnMotivoOnclick(){
        let motivoVista = new MotivoListaVista();
        motivoVista.cargarVista();
    }
}

export default MenuVista;