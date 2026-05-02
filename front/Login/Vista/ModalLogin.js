import MenuVista from "../../Menu/MenuVista.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import ModalBase from "../../Utiles/Modal/ModalBase.js";
import LoginServicio from "../Aplicacion/LoginServicio.js";

class ModalLogin {
    archivo = "./front/Login/Vista/ModalLogin.html";
    ids = {
        txtUser : "txtUser",
        txtPass : "txtPass",
        btnIngresar : "btnIngresar",
        lblErrores : "lblErrores"
    };
    form = new Formulario();
    ident = new Identificadores();
    loginService = new LoginServicio();
    modalBase = new ModalBase();

    constructor(parameters) {
        
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        await this.modalBase.abrirModal(vista);
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnIngresar = document.getElementById(this.ids.btnIngresar);
        btnIngresar.onclick = function() {
            esto.btnIngresarOnClick();           
        };
    }

    async btnIngresarOnClick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        let txtPass = document.getElementById(this.ids.txtPass);
        let res = await this.loginService.login(txtUser.value , txtPass.value);
        console.log(await res);
        if (res.bandera === true) {
            let menu = new MenuVista();
            menu.cargarVista();
            this.modalBase.cerrarModal();
        } else {
            let errores = document.getElementById(this.ids.lblErrores);
            errores.innerHTML = res.mensaje;
        }
    }
}

export default ModalLogin;