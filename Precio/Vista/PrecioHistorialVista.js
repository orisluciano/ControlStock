import ModalBase from "../../Utiles/Modal/ModalBase.js";
import PrecioServicio from "../Aplicacion/PrecioServicio.js";

class PrecioHistoriaVista {
    archivo = "./Precio/Vista/PrecioHistorial.html";
    ids = {
        divTabla : "divTabla",
        tblPrecio : "tblPrecio",
        divPaginacion : "divPaginacion",
        txtDesde : "txtDesde",
        txtHasta : "txtHasta",
        btnBuscarPrecio : "btnBuscarPrecio"
    };
    productoId = null;
    precioServicio = new PrecioServicio();

    constructor(productoId) {
        this.productoId = productoId;
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
        let btnBuscar = document.getElementById(this.ids.btnBuscarPrecio);
        btnBuscar.onclick = function(params) {
            esto.btnBuscarPrecioOnClick();
        }
    }

    async mostrarDatos(){
        let txtDesde = document.getElementById(this.ids.txtDesde);
        let desde = txtDesde.value;
        let txtHasta = document.getElementById(this.ids.txtHasta);
        let hasta = txtHasta.value;
        let respBase = await this.precioServicio.getPreciosById(this.productoId, desde, hasta);
        console.log(respBase);
        let tabla = document.getElementById(this.ids.tblPrecio);
        if (respBase.errores.length > 0) {
            respBase.errores.forEach(e => {
                alert(e);
            });
        } else {
            
            this.cargarTabla(respBase.respuesta.resultados);
        }
    }

    async btnBuscarPrecioOnClick(){
        await this.mostrarDatos();
    }

    cargarTabla(datos){
        let tabla = document.getElementById(this.ids.tblPrecio);
        tabla.innerHTML = "";
        datos.forEach(e => {
            tabla.appendChild(this.crearLinea(e));
        });
    }

    crearLinea(precio){
        let esto = this;
        let linea = document.createElement("tr");
        linea.className = "filaTabla";
        let colCosto= document.createElement("td");
        colCosto.innerHTML = precio.costo;
        linea.appendChild(colCosto);
        let colVenta = document.createElement("td");
        colVenta.innerHTML = precio.venta;
        linea.appendChild(colVenta);
        let colFecha = document.createElement("td");
        colFecha.innerHTML = precio.fechaModif;
        linea.appendChild(colFecha);
        return linea;
    }
}
export default PrecioHistoriaVista;