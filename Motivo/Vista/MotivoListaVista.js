import BotonesSVG from "../../Utiles/BotonesSVG.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import MotivoServicio from "../Aplicacion/MotivoServicio.js";
import MotivoABM from "./MotivoABM.js";

class MotivoListaVista {
    archivo = "./Motivo/Vista/MotivoListaVista.html";
    ids = { 
        btnNuevoMotivo : "btnNuevoMotivo",
        tblMotivo : "tblMotivo",
        divPaginacion : "divPaginacion"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    botones = new BotonesSVG();
    motivoService = new MotivoServicio();

    constructor(parameters) {
        
    }

    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        root.innerHTML = res;
        this.cargarFunciones();
        await this.mostrarDatos(0, 10, 0);
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevo = document.getElementById(this.ids.btnNuevoMotivo);
        btnNuevo.onclick = function(params) {
            esto.btnNuevoMotivoOnClick();
        }
    }

    async mostrarDatos(){
        let tipos = await this.cargarDatos();
        if (tipos.errores.length > 0) {
            alert("Hubo un problema al cargar los datos...");
            let tabla = document.getElementById(this.ids.tblMotivo);
            tabla.innerHTML = "";
            tipos.errores.forEach(e => {
                let linea = document.createElement("tr");
                linea.className = "colorAlert";
                linea.innerHTML = e;
                tabla.appendChild(linea);
            });
        } else {
            this.cargarTabla(tipos.respuesta);   
        }
    }

    async cargarDatos(){
        let res = await this.motivoService.getMotivos();
        return await res;
    }

    cargarTabla(datos){
        let tabla = document.getElementById(this.ids.tblMotivo);
        tabla.innerHTML = "";
        datos.forEach(e => {
            tabla.appendChild(this.crearLinea(e));
        });
    }

    crearLinea(tipo){
        let esto = this;
        let linea = document.createElement("tr");
        linea.className = "filaTabla";
        let colNombre = document.createElement("td");
        colNombre.innerHTML = tipo.descripcion;
        linea.appendChild(colNombre);
        let colTipo = document.createElement("td");
        colTipo.innerHTML = tipo.tipo;
        linea.appendChild(colTipo);
        linea.onclick = function() {
            esto.irABM(esto.operaciones.ver, tipo);
        }
        return linea;
    }

    cargarPaginacion(cantUser, cantMostrar, index){
        let esto = this;
        let divPaginacion = document.getElementById(this.ids.divPaginacion);
        divPaginacion.innerHTML = "";
        if(cantUser > cantMostrar){
            let cantBtns = cantUser / cantMostrar;
            for (let i = 0; i < cantBtns; i++) {
                let btn = document.createElement("button");
                btn.innerHTML = i+1;
                if (index === i) {
                    btn.className = "btnPagiSel";
                    btn.disabled = true;
                } else {
                    btn.className = "btnPagiNoSel";
                }
                btn.onclick = function() {
                    esto.mostrarDatos(i * cantMostrar, cantMostrar, i);
                }
                divPaginacion.appendChild(btn);
            }
        }
    }

    lineaTablaOnclick(tipo){
        this.irABM(this.operaciones.ver, tipo);
    }

    btnNuevoMotivoOnClick(){
        let tipo = {};
        this.irABM(this.operaciones.crear, tipo);
    }

    irABM(operacion, tipo){
        let abm = new MotivoABM(operacion, tipo);
        abm.cargarVista();
    }
}

export default MotivoListaVista;