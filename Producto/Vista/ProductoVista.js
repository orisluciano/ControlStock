import BotonesSVG from "../../Utiles/BotonesSVG.js";
import Operaciones from "../../Utiles/Operaciones.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import ProductoServicio from "../Aplicacion/ProductoServicio.js";

class ProductoVista {
    archivo = "./Producto/Vista/ProductoVista.html";
    ids = { 
        btnNuevoProd : "btnNuevoProd",
        tblProd : "tblProd",
        divPaginacion : "divPaginacion"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    botones = new BotonesSVG();
    prodService = new ProductoServicio();

    constructor(parameters) {
        
    }

    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        root.innerHTML = res;
        //this.cargarFunciones();
        await this.mostrarDatos(0, 10, 0);
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevoProd = document.getElementById(this.ids.btnNuevoProd);
        btnNuevoProd.onclick = function(params) {
            esto.btnNuevoUserOnClick();
        }
    }

    async mostrarDatos(desde, cantidad, index){
        let usuarios = await this.cargarDatos(desde, cantidad);
        this.cargarTabla(usuarios.respuesta, index);
    }

    async cargarDatos(desde, cantidad){
        let res = await this.prodService.getProductos(desde, cantidad);
        console.log(await res);
        return await res;
    }

    cargarTabla(datos, index){
        let tabla = document.getElementById(this.ids.tblProd);
        tabla.innerHTML = "";
        datos.resultados.forEach(e => {
            tabla.appendChild(this.crearLinea(e));
        });
        this.cargarPaginacion(datos.cantidad, 10, index);
    }

    crearLinea(usuario){
        let esto = this;
        let linea = document.createElement("tr");
        linea.className = "filaTabla";
        let colNombre = document.createElement("td");
        colNombre.innerHTML = usuario.usuario;
        linea.appendChild(colNombre);
        let colTipo = document.createElement("td");
        colTipo.innerHTML = usuario.tipoUsuarioId;
        linea.appendChild(colTipo);
        let colBloqueado = document.createElement("td");
        colBloqueado.innerHTML = usuario.bloqueado;
        linea.appendChild(colBloqueado);
        /*linea.onclick = function(params) {
            esto.lineaTablaOnclick(usuario);
        };*/
        let btnModif = document.createElement("button");
        //btnModif.innerHTML = this.operaciones.modificar;
        btnModif.innerHTML = this.botones.editar;
        btnModif.className = "btnCrud";
        btnModif.onclick = function(params) {
            esto.irABM(esto.operaciones.modificar, usuario);
        };
        linea.appendChild(btnModif);
        let btnElim = document.createElement("button");
        btnElim.className = "btnCrud";
        //btnElim.innerHTML = this.operaciones.eliminar;
        btnElim.innerHTML = this.botones.eliminar;
        btnElim.onclick = function(params) {
            esto.irABM(esto.operaciones.eliminar, usuario);
        };
        linea.appendChild(btnElim);
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

    lineaTablaOnclick(usuario){
        let abm = new UsuarioABM(this.operaciones.ver, usuario);
        abm.cargarVista();
    }

    btnNuevoUserOnClick(){
        let usuario = {};
        this.irABM(this.operaciones.crear, usuario);
    }

    irABM(operacion, usuario){
        let abm = new UsuarioABM(operacion, usuario);
        abm.cargarVista();
    }
}

export default ProductoVista;