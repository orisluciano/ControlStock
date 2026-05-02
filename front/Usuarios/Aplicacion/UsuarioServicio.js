import TokenServicio from "../../Token/TokenServicio.js";
import PeticionesHttp from "../../Utiles/PeticionesHttp.js";

class UsuarioServicio {
    api = "http://localhost/backendlaburitoya/api/usuario";
    tokenService = new TokenServicio();
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    getUsuario(id){
        alert("proximamente. id: " + id);
    }

    async getUsuarios(desde, cantidad){
        let dir = this.api + "/" + desde + "/" + cantidad;
        let peticion = await fetch(dir, {
            method : "GET"
        });
        let json = await peticion.json();
        console.log(json);
        return json;
    }

    async nuevo(usuario){
        let base = await this.peticiones.peticionesVarias(this.api, "POST", usuario, this.tokenService.BearerToken());
        return await base;
    }

    modificar(usuario){
        alert("proximamente");
    }

    eliminar(id){
        alert("proximamente");
    }
}
export default UsuarioServicio;