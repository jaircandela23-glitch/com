document.addEventListener('DOMContentLoaded', () => {
    
    window.generarQR = function() {
        if (typeof QRCode === 'undefined') {
            console.error("ERROR: La librería qrcode.js no está cargada. Verifica el enlace CDN en el HTML.");
            return;
        }
        
        const dataType = document.getElementById('dataTypeSelect').value;
        let dataToEncode = '';
        
        // --- 1. Determinar el Tipo de Dato a Codificar ---
        if (dataType === 'url') {
            const urlInput = document.getElementById('urlInput');
            dataToEncode = urlInput.value.trim();
            if (!dataToEncode) {
                alert("Por favor, introduce un ENLACE URL válido.");
                return;
            }
        } else if (dataType === 'vcard') {
            // Recoger los campos de vCard
            const nombre = document.getElementById('vcardNombre').value.trim();
            const titulo = document.getElementById('vcardTitulo').value.trim();
            const email = document.getElementById('vcardEmail').value.trim();
            const telefono = document.getElementById('vcardTelefono').value.trim();
            const web = document.getElementById('vcardWeb').value.trim();
            
            // Validación mínima para vCard
            if (!nombre || !email) {
                alert("Para vCard, el Nombre y el Email son campos obligatorios.");
                return;
            }

            // Construir la cadena de vCard (Formato estándar)
            const vCardParts = [
                'BEGIN:VCARD',
                'VERSION:3.0',
                `FN:${nombre}`, // Nombre Formateado
            ];
            
            // N: Apellido;Nombre;SegundoNombre;Prefijo;Sufijo. Simplificado a solo Nombre
            const nameParts = nombre.split(' ');
            vCardParts.push(`N:${nameParts[nameParts.length - 1]};${nameParts.slice(0, -1).join(' ')};;;`);

            if (titulo) {
                vCardParts.push(`TITLE:${titulo}`);
            }
            if (telefono) {
                vCardParts.push(`TEL;TYPE=CELL:${telefono}`);
            }
            if (email) {
                vCardParts.push(`EMAIL;TYPE=PREF,INTERNET:${email}`);
            }
            if (web) {
                vCardParts.push(`URL:${web}`);
            }
            
            vCardParts.push('END:VCARD');
            
            // Unir todas las partes con saltos de línea
            dataToEncode = vCardParts.join('\n');
        }
        
        // --- 2. Generación y Descarga (Lógica ya existente) ---
        const contenedor = document.getElementById('contenedorQR');
        const btnDescargar = document.getElementById('btnDescargar');

        contenedor.innerHTML = '';
        btnDescargar.style.display = 'none';

        new QRCode(contenedor, {
            text: dataToEncode,
            width: 280, 
            height: 280,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H 
        });

        setTimeout(() => {
            const canvas = contenedor.querySelector('canvas');
            
            if (canvas) {
                const dataURL = canvas.toDataURL('image/png');
                const filename = `qr-${dataType}-elite-${Date.now()}.png`;
                
                btnDescargar.href = dataURL;
                btnDescargar.download = filename;
                btnDescargar.style.display = 'inline-block';
            } else {
                console.error("Fallo al encontrar el elemento <canvas> para la descarga.");
            }
        }, 300); 
    }
});
