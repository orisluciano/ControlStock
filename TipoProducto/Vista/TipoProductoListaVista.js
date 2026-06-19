import BotonesSVG from "../../Utiles/BotonesSVG.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import TipoProductoServicio from "../Aplicacion/TipoProductoServicio.js";
import TipoProductoABM from "./TipoProductoABM.js";

class TipoProductoListaVista {
    archivo = "./TipoProducto/Vista/TipoProductoListaVista.html";
    ids = { 
        btnNuevoTipoProd : "btnNuevoTipoProd",
        tblTipoProd : "tblTipoProd",
        divPaginacion : "divPaginacion"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    botones = new BotonesSVG();
    tipoProdService = new TipoProductoServicio();

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
        let btnNuevo = document.getElementById(this.ids.btnNuevoTipoProd);
        btnNuevo.onclick = function(params) {
            esto.btnNuevoTipoProdOnClick();
        }
    }

    async mostrarDatos(){
        let tipos = await this.cargarDatos();
        if (tipos.errores.length > 0) {
            alert("Hubo un problema al cargar los datos...");
            let tabla = document.getElementById(this.ids.tblTipoProd);
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
        let res = await this.tipoProdService.getProductos();
        return await res;
    }

    cargarTabla(datos){
        let tabla = document.getElementById(this.ids.tblTipoProd);
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

    btnNuevoTipoProdOnClick(){
        let tipo = {};
        this.irABM(this.operaciones.crear, tipo);
    }

    irABM(operacion, tipo){
        let abm = new TipoProductoABM(operacion, tipo);
        abm.cargarVista();
    }
}

export default TipoProductoListaVista;