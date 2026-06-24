import ProductoABM from "../../Producto/Vista/ProductoABM.js";
import Formulario from "../../Utiles/Formulario.js";
import Identificadores from "../../Utiles/Identificadores.js";
import Operaciones from "../../Utiles/Operaciones.js";
import EscanerServicio from "../Servicio/EscanerServicio.js";

class EscanerVista {
    archivo = "./Escaner/Vista/EscanerVista.html";
    ids = {
        divEscaner : "divEscaner",
        camara : "camara",
        divResult : "divResult"
    };
    form = new Formulario();
    ident = new Identificadores();
    operaciones = new Operaciones();
    producto = {
        tipoCod : null,
        codigo : null
    };
    
    constructor() {
        
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
            //this.detectar(video);
            this.deteccion(video);
            }
        }
        //setInterval(this.intervalo, 1000);
    }

    intervalo(){
        this.detectar();
    }

    detectar(video){
        let resulta = document.getElementById(this.ids.divResult);
        resulta.innerHTML = "Esperando lectura";
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
        if (codes.length === 0){
            resulta.innerHTML = "sin resultados";
            return;
        } 
    
        for (const barcode of codes)  {
            // Log the barcode to the console
            console.log(barcode)
            //resulta.innerHTML = barcode.format + ": " + barcode.rawValue;
            resulta.innerHTML = barcode;
            this.sonidoPrueba();
            this.buscarProducto(barcode.rawValue, barcode.format);
            clearInterval(detectCode);
        }
        }).catch(err => {
        // Log an error if one happens
        console.error(err);
        resulta.innerHTML = err;
        })
        }
        setInterval(detectCode, 100);
    }

    async deteccion(video){
        let esto = this;
        let encontrado = false;
        let resulta = document.getElementById(this.ids.divResult);
        resulta.innerHTML = "Esperando lectura";
        let formatos = await BarcodeDetector.getSupportedFormats();
        const barcodeDetector = new BarcodeDetector({ formatos });
        const detectCode = async function () {
            let codigos = null;
            try {
                codigos = await barcodeDetector.detect(video);
                if (codigos.length === 0){
                resulta.innerHTML = "sin resultados";
                return;
                }
                resulta.innerHTML = codigos[0].format + " - "+ codigos[0].rawValue;
                encontrado = true;
            } catch (error) {
                err => {
                    // Log an error if one happens
                    console.error(err);
                    resulta.innerHTML = err;
                }
            }
            if (encontrado) {
                clearInterval(intervalo);
                esto.sonidoEscaner();
                esto.buscarProducto(codigos[0].rawValue, codigos[0].format);
            }
        };
        let intervalo = setInterval(detectCode, 1000);
    }

    apagarCamara(){
        let videoElement = document.getElementById(this.ids.camara);
                if (videoElement.srcObject) {
                // Obtiene el stream directamente del elemento HTML y apaga las pistas
                videoElement.srcObject.getTracks().forEach(track => track.stop());
    
                 // Limpia el elemento
                videoElement.srcObject = null;
                }
    }

    sonidoPrueba(){
        // 1. Crear el contexto de audio
        const audioCtx = new AudioContext();

        // 2. Crear un oscilador
        const oscilador = audioCtx.createOscillator();

        // 3. Configurar el tipo de onda y frecuencia (ej. 440 Hz es un La)
        oscilador.type = 'sine'; // 'sine', 'square', 'triangle', 'sawtooth'
        oscilador.frequency.value = 440;

        // 4. Conectar el oscilador a los altavoces
        oscilador.connect(audioCtx.destination);

        // 5. Reproducir
        oscilador.start();

        // 6. Detener a los 2 segundos
        oscilador.stop(audioCtx.currentTime + 2);
    }

    sonidoEscaner() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Use a triangle or square wave for an electronic "beep"
        oscillator.type = 'triangle'; 
        // Supermarket scanners typically range between 850 Hz - 1000 Hz
        oscillator.frequency.value = 1000; 

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Fade out to avoid a harsh popping sound
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1); // Plays for 100ms
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
    
    irABMProducto(){
        let abm = new ProductoABM(this.operaciones.crear, this.producto);
        abm.cargarVista();
    }

    async buscarProducto(codigo, tipo){
        let base = {};
        let serv = new EscanerServicio();
        base = await serv.buscarProducto(codigo,tipo);
        //1-Buscar
        if (base.encontrado) {
            this.apagarCamara();
            let ver = new ProductoABM(this.operaciones.ver, base.producto);
            ver.cargarVista();
        } else {
            if (confirm("Desea crear este producto")) {
                this.apagarCamara();
                this.producto.codigo = codigo;
                this.producto.tipoCodigo = tipo;
                let crear = new ProductoABM(this.operaciones.crear, this.producto);
                crear.cargarVista();
            }else{
                this.apagarCamara();
                this.cargarVista();
            }
        }
    }
}
export default EscanerVista;