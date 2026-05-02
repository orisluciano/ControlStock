class TokenServicio {
    constructor(){
        this.NombreToken = "LaburitoToken";
        this.Almacenamiento = window.localStorage;
    }

    SetToken(token){
        this.Almacenamiento.setItem(this.NombreToken, token);
    }

    GetToken(){
        return this.Almacenamiento.getItem(this.NombreToken);
    }

    BorrarToken(){
        this.Almacenamiento.setItem(this.NombreToken, "");
    }

    BearerToken(){
        return "Bearer " + this.GetToken();
    }

    Decodificar(){}

    parseJwt () {
        //var base64Url = token.split('.')[1];
        var base64Url = this.GetToken().split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    ComprobarFechaToken(exp){
        const ahora = new Date();console.log("ahora: " + ahora.getTime());
        const fechaToken = new Date(exp * 1000);console.log("token: " + fechaToken.getTime());
        return(ahora.getTime() <= fechaToken.getTime() ? true : false)
    }

    verificarToken(){
        let logueadoValido = false;
        
        if (this.GetToken() !== null) {
            if (this.GetToken() !== "" && this.ComprobarFechaToken(this.parseJwt().exp)) {
                logueadoValido = true;
            } else {
                logueadoValido = false;                
            }
        } else {
            logueadoValido = false;
        }
        return logueadoValido;
    }
}
export default TokenServicio;