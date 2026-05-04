import Inicio from "../Inicio/Inicio.js";
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
        btnTipoMovimiento : "btnTipoMovimiento"
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
        //this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnConfig = document.getElementById(this.ids.btnConfig);
        btnConfig.onclick = function() {
            esto.btnConfigOnClick();           
        };
        let btnLogout = document.getElementById(this.ids.btnLogout);
        btnLogout.onclick = function() {
            esto.btnLogoutOnClick();
        };
        let btnPerfil = document.getElementById(this.ids.btnPerfil);
        btnPerfil.onclick = function(params) {
            esto.btnPerfilOnClick();
        };
        let btnUsers = document.getElementById(this.ids.btnUsers);
        btnUsers.onclick = function(params) {
            esto.btnUsersOnClick();
        };
        let btnRubro = document.getElementById(this.ids.btnRubro);
        btnRubro.onclick = function(params) {
            esto.btnRubroOnClick();
        };
        let btnSugerencias = document.getElementById(this.ids.btnSugerencias);
        btnSugerencias.onclick = function(params) {
            esto.btnSugerenciasOnClick();
        };
        let btnTipoContacto = document.getElementById(this.ids.btnTipoContacto);
        btnTipoContacto.onclick = function(params) {
            esto.btnTipoContactoOnClick();
        };
        let btnTrabajador = document.getElementById(this.ids.btnTrabajador);
        btnTrabajador.onclick = function(params) {
            esto.btnTrabajadorOnClick();
        };
        let btnTrabContacto = document.getElementById(this.ids.btnTrabContacto);
        btnTrabContacto.onclick = function(params) {
            esto.btnTrabContactoOnClick();
        };
        let btnTrabOpi = document.getElementById(this.ids.btnTrabOpi);
        btnTrabOpi.onclick = function(params) {
            esto.btnTrabOpiOnClick();
        };
        let btnTrabRubro = document.getElementById(this.ids.btnRubro);
        btnTrabRubro.onclick = function(params) {
            esto.btnTrabRubroOnClick();
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
}

export default MenuVista;