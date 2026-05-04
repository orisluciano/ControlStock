import MenuVista from "../Menu/MenuVista.js";


class Inicio {
    constructor(parameters) {
        
    }

    iniciarApp(){
        this.cargarMenu();
    }

    cargarMenu(){
        let menu = new MenuVista;
        menu.cargarVista();
    }
}

export default Inicio;