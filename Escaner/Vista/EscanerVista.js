import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";

class EscanerVista {
    archivo = "./Escaner/Vista/EscanerVista.html";
    ids = {
        divEscaner : "divEscaner",
        camara : "camara",
        divResult : "divResult"
    };
    form = new Formulario();
    ident = new Identificadores();
    
    constructor() {}
    
    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        root.innerHTML = res;
        this.cargarFunciones();
    }

    cargarFunciones(){
        window.addEventListener('DOMContentLoaded', this.iniciarEscaner());
    }

    async iniciarEscaner() {
    // 1. Verificar soporte del navegador
    if (!('BarcodeDetector' in window)) {
        console.error('El navegador no soporta BarcodeDetector de forma nativa.');
        return;
    }

    const video = document.getElementById('camara');
    const resultado = document.getElementById('resultado');

    // 2. Definir formatos a buscar (EAN-13, QR, Code 128, etc.)
    const detector = new BarcodeDetector({ 
        formats: ['ean_13', 'code_128', 'qr_code'] 
    });

    try {
        // 3. Activar la cámara del dispositivo
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error al acceder a la cámara:', err);
    }

    // 4. Bucle para escanear fotogramas del video
    async function detectarFrame() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            try {
                const codigos = await detector.detect(video);
                if (codigos.length > 0) {
                    resultado.innerText = `Código: ${codigos[0].rawValue}`;
                    console.log('Datos completos:', codigos[0]);
                }
            } catch (error) {
                console.error('Error de detección:', error);
            }
        }
        requestAnimationFrame(detectarFrame);
    }

    video.addEventListener('play', () => {
        requestAnimationFrame(detectarFrame);
    });
    }

// Ejecutar función al cargar la página
//window.addEventListener('DOMContentLoaded', iniciarEscaner);
       
}
export default EscanerVista;