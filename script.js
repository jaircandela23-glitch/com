document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // FUNCIÓN 1: EFECTO DE MÁQUINA DE ESCRIBIR (Typewriter Effect)
    // -----------------------------------------------------------------
    const heroTitle = document.querySelector('.terminal-body .typed-output');
    const originalText = heroTitle ? heroTitle.innerHTML : null;
    
    if (heroTitle && originalText) {
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                // Manejo de la etiqueta <span> para mantener el color highlight
                if (originalText.substring(i, i + 7) === '<span c') {
                    const closingSpanIndex = originalText.indexOf('</span>', i) + 7;
                    heroTitle.innerHTML += originalText.substring(i, closingSpanIndex);
                    i = closingSpanIndex;
                } else {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 40); // 40ms por letra
            }
        }
        typeWriter();
    }


    // -----------------------------------------------------------------
    // FUNCIÓN 2: ESTATUS DEL SISTEMA (Datos simulados sin llamadas externas)
    // -----------------------------------------------------------------
    const outputElement = document.getElementById('system-status-output');
    
    if (outputElement) {
        
        function displaySystemStatus() {
            const now = new Date();
            // Formato de hora simulando un display de terminal (HH:MM:SS)
            const timeString = now.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit', second:'2-digit'});
            const dateString = now.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
            
            // Generación de la salida HTML (Estilo de tarjeta "Hack")
            const outputHtml = `
                <p class="status-line"><span class="label">SYSTEM ID:</span> <span class="value">SEC-JMRX-078</span></p>
                <p class="status-line"><span class="label">ESTATUS:</span> <span class="value success">OPERACIONAL (100%)</span></p>
                <p class="status-line"><span class="label">ÚLTIMO REPORTE:</span> <span class="value">${dateString}</span></p>
                <p class="status-line"><span class="label">HORA LOCAL (UTC):</span> <span class="value">${timeString}</span></p>
                <p class="status-line"><span class="label">LATENCIA MEDIA:</span> <span class="value">28ms</span></p>
                <p class="status-line"><span class="label">PROTOCOLOS:</span> <span class="value success">TLS 1.3 / SSH</span></p>
                <p class="status-line"><span class="label">FIREWALL:</span> <span class="value success">ACTIVO</span></p>
            `;
            
            outputElement.innerHTML = outputHtml;
        }

        // Ejecutar inmediatamente y luego actualizar cada 5 segundos para simular dinamismo
        displaySystemStatus();
        setInterval(displaySystemStatus, 5000); 
    }

    // -----------------------------------------------------------------
    // FUNCIÓN 3: MANEJO DEL FORMULARIO DE CONTACTO Y MODAL
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contact-query-form');
    const modalOverlay = document.getElementById('status-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.querySelector('.modal-icon i');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (contactForm) {
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Detener el envío estándar del formulario (importante)
            
            // 1. Mostrar Modal en estado "Procesando"
            modalIcon.className = 'fas fa-spinner fa-spin'; // Icono de carga
            modalIcon.style.color = 'var(--primary-neon)'; // Restaurar color neón
            modalTitle.textContent = 'Procesando Solicitud...';
            modalMessage.textContent = 'Analizando datos y asignando especialista de contacto. Espere un momento...';
            modalCloseButton.classList.add('hidden'); // Ocultar botón de cerrar
            modalOverlay.classList.remove('hidden');

            // Simular un tiempo de procesamiento (3 segundos)
            setTimeout(() => {
                
                // 2. Transicionar a estado "Éxito"
                modalIcon.className = 'fas fa-check-circle'; // Icono de éxito
                modalIcon.style.color = '#27c93f'; // Color verde de éxito (success)

                modalTitle.textContent = '¡Solicitud Procesada con Éxito!';
                modalMessage.textContent = 'Su solicitud ha sido recibida y asignada al equipo. Nos pondremos en contacto con usted por correo o teléfono a la brevedad posible.';
                
                modalCloseButton.classList.remove('hidden'); // Mostrar botón de cerrar
                
                // 3. Limpiar el formulario
                contactForm.reset();

            }, 3000); // 3000 milisegundos = 3 segundos

        });

        // Evento para cerrar el modal
        modalCloseButton.addEventListener('click', function() {
            modalOverlay.classList.add('hidden');
        });

        // Evento para cerrar el modal al hacer click fuera (solo si ya no está "procesando")
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                if (modalTitle.textContent !== 'Procesando Solicitud...') {
                    modalOverlay.classList.add('hidden');
                }
            }
        });
    }

});
