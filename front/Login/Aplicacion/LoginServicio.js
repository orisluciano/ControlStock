import TokenServicio from "../../Token/TokenServicio.js";

class LoginServicio {
    api = "http://localhost/backendlaburitoya/api/login";
    tokenService = new TokenServicio();
    constructor(parameters) {
        
    }

    async login(usuario, contraseña){
        let res = {
            bandera : false,
            mensaje : ""
        };
        try {
            let body = {
                usuario : usuario,
                contraseña : contraseña,
                appName : "TuLaburitoAdmin"
            }; 
            let peticion = await fetch(this.api,{
                method : "POST",
                body: JSON.stringify(body)
            });
            let json = await peticion.json();
            console.log(await json);
            if (await json.respuesta.token != null) {
                res.bandera = true;
                res.mensaje = "Bienvenido al sistema";
                this.tokenService.SetToken(await json.respuesta.token);
            } else {
                await json.errores.forEach(e => {
                    res.mensaje = res.mensaje;
                    res.mensaje = res.mensaje + ", " + e;
                });
            }    
        } catch (error) {
          console.log(error);
          res.mensaje = "Hubo un error. Intente de nuevo."  
        }
        
        return res;
    }

    verificarLogueo(){
        let respuesta = {
            usuario : null,
            errores : null   
        }
        let usuario = this.tokenService.GetToken();
        if (usuario != null) {
            respuesta.usuario = usuario;console.log(usuario);
        } else {
            respuesta.errores = "Usuario no logueado";
        }
        
        return respuesta;
    }

    logout(){
        localStorage.clear();
    }
}
export default LoginServicio;