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
    
    constructor() {
        let pagina = "https://medium.com/js-now/creating-a-real-time-qr-code-scanner-with-vanilla-javascript-part-1-2-creating-the-scanner-a8934ee8f614";
    }
    
    async cargarVista(){
        let res = await this.form.getForm(this.archivo);
        let root = document.getElementById(this.ident.root);
        root.innerHTML = "";
        root.innerHTML = res;
        this.cargarFunciones();
    }

    cargarFunciones(){
        //window.addEventListener('DOMContentLoaded', this.iniciarEscaner());
        if (!("BarcodeDetector" in globalThis)) {
            alert("Barcode Detector is not supported by this browser.");
        } else {
            alert("Barcode Detector supported!");
            const video = document.getElementById(this.ids.camara);
            // Check if device has camera
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Use video without audio
            const constraints = { 
            video: {facingMode: { exact: "environment" }}, // Selecciona la cámara trasera
            // },
            audio: false
            }
  
            // Start video stream
        navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);
        }
        }
        setInterval(this.detectar, 100);
    }

    detectar(){
        let resulta = document.getElementById(this.ids.divResult);
        // Create new barcode detector
        let formats;
// Save all formats to formats var 
BarcodeDetector.getSupportedFormats().then(arr => formats = arr);
// Create new barcode detector with all supported formats
const barcodeDetector = new BarcodeDetector({ formats });

// Detect code function 
const detectCode = () => {
  // Start detecting codes on to the video element
  barcodeDetector.detect(video).then(codes => {
    // If no codes exit function
    if (codes.length === 0) return;
    
    for (const barcode of codes)  {
      // Log the barcode to the console
      console.log(barcode)
      resulta.innerHTML = barcode;
    }
  }).catch(err => {
    // Log an error if one happens
    console.error(err);
    resulta.innerHTML = err;
  })
}
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