import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";

class EscanerVista {
    archivo = "./Escaner/Vista/EscanerVista.html";
        ids = {
            divEscaner : "divEscaner"
        };
        form = new Formulario();
        ident = new Identificadores();
    
        constructor() {
        }
    
        async cargarVista(){
            let res = await this.form.getForm(this.archivo);
            let root = document.getElementById(this.ident.root);
            root.innerHTML = "";
            root.innerHTML = res;
            this.cargarFunciones();
        }
    
    cargarFunciones(){}
}

export default EscanerVista;