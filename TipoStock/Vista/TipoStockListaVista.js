import BotonesSVG from "../../Utiles/BotonesSVG.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import TipoStockServicio from "../Aplicacion/TipoStockServicio.js";
import TipoStockABM from "./TipoStockABM.js";

class TipoStockListaVista {
    archivo = "./TipoStock/Vista/TipoStockListaVista.html";
    ids = { 
        btnNuevoTipoStock : "btnNuevoTipoStock",
        tblTipoStock : "tblTipoStock",
        divPaginacion : "divPaginacion"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    botones = new BotonesSVG();
    tipoStockService = new TipoStockServicio();

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
        let btnNuevoTipoStock = document.getElementById(this.ids.btnNuevoTipoStock);
        btnNuevoTipoStock.onclick = function(params) {
            esto.btnNuevoTipoStockOnClick();
        }
    }

    async mostrarDatos(){
        let tipos = await this.cargarDatos();
        if (tipos.errores.length > 0) {
            alert("Hubo un problema al cargar los datos...");
            let tabla = document.getElementById(this.ids.tblTipoStock);
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
        let res = await this.tipoStockService.getTodo();
        return await res;
    }

    cargarTabla(datos){
        let tabla = document.getElementById(this.ids.tblTipoStock);
        tabla.innerHTML = "";
        datos.forEach(e => {
            tabla.appendChild(this.crearLinea(e));
        });
    }

    crearLinea(tipoStock){
        let esto = this;
        let linea = document.createElement("tr");
        linea.className = "filaTabla";
        let colNombre = document.createElement("td");
        colNombre.innerHTML = tipoStock.descripcion;
        linea.appendChild(colNombre);
        linea.onclick = function(params) {
            esto.lineaTablaOnclick(tipoStock);
        };
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

    lineaTablaOnclick(tipoStock){
        this.irABM(this.operaciones.ver, tipoStock);
    }

    btnNuevoTipoStockOnClick(){
        let tipoStock = {};
        this.irABM(this.operaciones.crear, tipoStock);
    }

    irABM(operacion, tipoStock){
        let abm = new TipoStockABM(operacion, tipoStock);
        abm.cargarVista();
    }
}

export default TipoStockListaVista;