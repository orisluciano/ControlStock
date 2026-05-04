class PeticionesHttp {
    respuesta = {
        errores : [],
        mensajes : [],
        resultado : null
    }
    constructor() {
        
    }

    async peticionGet(dir, metodo) {
        try {
            let res = await fetch(dir,{
                method : metodo
            });
            let json = await res.json();
            console.log(json);
            this.respuesta = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }

    async  peticionesVarias(dir, metodo, datos, token) {
        try {
            let res = await fetch(dir,{
                method : metodo,
                body : JSON.stringify(datos),
                headers : new Headers({
                    'Accept' : 'application/json',
                    'Authorization' : token
                })
            });
            let json = await res.json();
            console.log(json);
            this.respuesta = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }

    async post(dir, datos, token) {
        try {
            let res = await fetch(dir,{
                method : "POST",
                body : JSON.stringify(datos),
                headers : new Headers({
                    'Accept' : 'application/json',
                    'Authorization' : token
                })
            });
            let json = await res.json();
            console.log(json);
            this.respuesta.resultado = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }

    async getWithToken(dir, token){
        try {
            let res = await fetch(dir,{
                method : "GET",
                headers : new Headers({
                    'Accept' : 'application/json',
                    'Authorization' : token
                })
            });
            let json = await res.json();
            this.respuesta = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }
}

export default PeticionesHttp;