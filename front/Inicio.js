import LoginServicio from "./Login/Aplicacion/LoginServicio.js";
import MenuLoginVista from "./Menu/MenuLoginVista.js";
import MenuVista from "./Menu/MenuVista.js";

class Inicio {
    loginService = new LoginServicio();
    constructor(parameters) {
        
    }

    iniciarApp(){
        this.cargarMenu();
    }

    cargarMenu(){
        let res = this.loginService.verificarLogueo();
        if (res.usuario === null) {
            let noLog = new MenuLoginVista();
            noLog.cargarVista();
        } else {
            console.log(res);
            let log = new MenuVista();
            log.cargarVista();
        }
    }
}

export default Inicio;