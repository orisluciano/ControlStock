import ModalLogin from "../Login/Vista/ModalLogin.js";
import Formulario from "../Utiles/Formulario.js";
import Identificadores from "../Utiles/Identificadores.js";

class MenuLoginVista {
    archivo = "./front/Menu/MenuLogin.html";
    ids = { 
        btnLogin : "btnLogin",
        btnCuenta : "btnCuenta",
        contenidoMenu : "contenidoMenu",
        divMenu : "divMenu"
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
        let btnLogin = document.getElementById(this.ids.btnLogin);
        btnLogin.onclick = function() {
            esto.btnLoginOnClick();           
        };
        let btnCuenta = document.getElementById(this.ids.btnCuenta);
        btnCuenta.onclick = function() {
            esto.btnCuentaOnclick();
        };
    }

    btnLoginOnClick(){
        let login = new ModalLogin();
        login.cargarVista();
    }

    btnCuentaOnclick(){
        /*let cuenta = new CrearCuentaVista();
        cuenta.CargarVista();*/
        alert("Proximamente");
    }
}

export default MenuLoginVista;