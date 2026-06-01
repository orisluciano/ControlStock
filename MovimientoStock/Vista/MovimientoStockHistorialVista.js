import ModalBase from "../../Utiles/Modal/ModalBase.js";
import MovimientoStockServicio from "../Aplicacion/MovimientoStockServicio.js";

class MovimientoStockHistorialVista {
    archivo = "./MovimientoStock/Vista/MovimientoStockHistorialVista.html";
    ids = {
        divTabla : "divTabla",
        tblMovs : "tblMovs",
        divPaginacion : "divPaginacion",
        txtDesde : "txtDesdeMov",
        txtHasta : "txtHastaMov",
        btnBuscarMov : "btnBuscarMov"
    };
    stockId = null;
    movService = new MovimientoStockServicio();

    constructor(stockId) {
        this.stockId = stockId;
    }

    async cargarVista(){
        let dir = await fetch(this.archivo);
        let vista = await dir.text();
        let modal = new ModalBase();
        await modal.abrirModal(vista);
        this.cargarFunciones();
        
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscarMov);
        btnBuscar.onclick = function(params) {
            esto.btnBuscarMovOnClick();
        }
    }

    async mostrarDatos(){
        let txtDesde = document.getElementById(this.ids.txtDesde);
        let desde = txtDesde.value;
        let txtHasta = document.getElementById(this.ids.txtHasta);
        let hasta = txtHasta.value;
        let respBase = await this.movService.getMovsById(this.stockId, desde, hasta);
        console.log(respBase);
        let tabla = document.getElementById(this.ids.tblMovs);
        if (respBase.errores.length > 0) {
            respBase.errores.forEach(e => {
                alert(e);
            });
        } else {
            
            this.cargarTabla(respBase.respuesta);
        }
    }

    async btnBuscarMovOnClick(){
        await this.mostrarDatos();
    }

    cargarTabla(datos){
        let tabla = document.getElementById(this.ids.tblMovs);
        tabla.innerHTML = "";
        datos.forEach(e => {
            tabla.appendChild(this.crearLinea(e));
        });
    }

    crearLinea(mov){
        let esto = this;
        let linea = document.createElement("tr");
        linea.className = "filaTabla";
        let colCant= document.createElement("td");
        colCant.innerHTML = mov.cantidad;
        linea.appendChild(colCant);
        let colTipoMov = document.createElement("td");
        colTipoMov.innerHTML = mov.tipo;
        linea.appendChild(colTipoMov);
        let colMotivo = document.createElement("td");
        colMotivo.innerHTML = mov.motivoMovId;
        linea.appendChild(colMotivo);
        let colFecha = document.createElement("td");
        colFecha.innerHTML = mov.fechaModif;
        linea.appendChild(colFecha);
        return linea;
    }
}
export default MovimientoStockHistorialVista;