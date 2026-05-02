class Formulario {
    constructor(parameters) {
        
    }

    async getForm(formulario){
        let respuesta = "";
        try {
            let base = await fetch(formulario);
            respuesta = await base.text();
        } catch (error) {
            console.log(error);
            respuesta = "Hubo un error";
        }
        return respuesta;
    }
}

export default Formulario;