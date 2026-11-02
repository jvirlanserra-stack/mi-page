(function () {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/face-api.js/dist/face-api.min.js';
    script.onload = async () => {
        const models = 'https://justadudewhohacks.github.io/face-api.js/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(models);
        await faceapi.nets.faceLandmark68Net.loadFromUri(models);
        await faceapi.nets.faceRecognitionNet.loadFromUri(models);

        class FaceMatch {
            getInfo() {
                return {
                    id: 'faceMatch',
                    name: 'Face Match',
                    blocks: [
                        { opcode: 'getDescriptorFromUrl', text: 'obtener descriptor de [URL]', blockType: Scratch.BlockType.REPORTER, arguments: { URL: { type: 'string', defaultValue: 'https://ejemplo.com/foto.jpg' } } },
                        { opcode: 'compare', text: 'distancia entre [D1] y [D2]', blockType: Scratch.BlockType.REPORTER, arguments: { D1: { type: 'string' }, D2: { type: 'string' } } },
                        { 
    opcode: 'mergeDescriptors', 
    text: 'fusionar descriptors de [D1] y [D2]', 
    blockType: Scratch.BlockType.REPORTER, 
    arguments: { 
        D1: { type: 'string' }, 
        D2: { type: 'string' } 
    } 
}

                    ]
                };
            }
            async getDescriptorFromUrl({ URL }) {
                try {
                    const img = await faceapi.fetchImage(URL);
                    const res = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                    return res ? JSON.stringify(Array.from(res.descriptor)) : 'no_cara';
                } catch (e) { return 'error_imagen'; }
            }
            compare({ D1, D2 }) {
                try {
                    return faceapi.euclideanDistance(new Float32Array(JSON.parse(D1)), new Float32Array(JSON.parse(D2)));
                } catch (e) { return 1; }
            }

            mergeDescriptors({ D1, D2 }) {
    try {
        const arrayA = JSON.parse(D1);
        const arrayB = JSON.parse(D2);

        // Comprueba si existen y si miden exactamente lo mismo (128 dimensiones)
        if (arrayA && arrayB && arrayA.length === arrayB.length) {
            const fusion = arrayA.map((valor, indice) => (valor + arrayB[indice]) / 2);
            return JSON.stringify(fusion); // Devuelve la cara fusionada en formato JSON de Scratch
        } else {
            return "Los vectores de las caras deben existir y tener la misma longitud.";
        }
    } catch (e) { 
        return "Los vectores de las caras deben existir y tener la misma longitud."; 
    }
}

        }
        Scratch.extensions.register(new FaceMatch());
    };
    document.head.appendChild(script);
})();
