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
    // FUNCIÓN 2: ESTATUS DEL SISTEMA (Datos simulados)
    // -----------------------------------------------------------------
    const outputElement = document.getElementById('system-status-output');
    
    if (outputElement) {
        
        function displaySystemStatus() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit', second:'2-digit'});
            const dateString = now.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
            
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

        displaySystemStatus();
        setInterval(displaySystemStatus, 5000); 
    }

    // -----------------------------------------------------------------
    // FUNCIÓN 3: MANEJO DEL FORMULARIO DE CONTACTO Y MODAL (Corregido)
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contact-query-form');
    const modalOverlay = document.getElementById('status-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.querySelector('.modal-icon i');
    const modalCloseButton = document.getElementById('modal-close-button');

    // Muestra el modal de éxito si la URL tiene ?form_submitted=true (Formspree)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('form_submitted')) {
        // 1. Configurar Modal para Éxito
        modalIcon.className = 'fas fa-check-circle'; // Icono de éxito
        modalIcon.style.color = '#27c93f'; // Color verde de éxito (success)
        modalTitle.textContent = '¡Solicitud Procesada con Éxito!';
        modalMessage.textContent = 'Su solicitud ha sido recibida. El equipo se pondrá en contacto con usted a la brevedad posible.';
        
        modalCloseButton.classList.remove('hidden'); // Mostrar botón de cerrar
        modalOverlay.classList.remove('hidden');
        
        // 2. Limpiar la URL después de mostrar el modal
        setTimeout(() => {
            history.replaceState(null, '', window.location.pathname);
        }, 50); 
    }
    
    if (contactForm) {
        
        // Al enviar, mostramos el modal de "Procesando" antes de la redirección de Formspree
        contactForm.addEventListener('submit', function(e) {
            
            modalIcon.className = 'fas fa-spinner fa-spin'; 
            modalIcon.style.color = 'var(--primary-neon)'; 
            modalTitle.textContent = 'Enviando Solicitud...';
            modalMessage.textContent = 'Conectando con el servidor seguro. Espere un momento...';
            modalCloseButton.classList.add('hidden'); 
            modalOverlay.classList.remove('hidden');
            
            // NO usamos e.preventDefault() aquí, permitiendo que Formspree haga su redirección
        });

        modalCloseButton.addEventListener('click', function() {
            modalOverlay.classList.add('hidden');
        });

        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                // Solo permite cerrar si ya no está en el estado de "Enviando Solicitud..."
                if (modalTitle.textContent.includes('Éxito')) {
                    modalOverlay.classList.add('hidden');
                }
            }
        });
    }


    // -----------------------------------------------------------------
    // FUNCIÓN 4: MODO DE ALTO CONTRASTE (ACCESIBILIDAD/ESTILO HACKER)
    // -----------------------------------------------------------------
    const toggleButton = document.getElementById('contrast-toggle-button');
    const body = document.body;
    const storageKey = 'jairMunozContrastMode';

    // 1. Verificar el estado al cargar
    if (localStorage.getItem(storageKey) === 'enabled') {
        body.classList.add('high-contrast');
    }

    // 2. Manejar el evento de click
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('high-contrast')) {
                // Desactivar
                body.classList.remove('high-contrast');
                localStorage.setItem(storageKey, 'disabled');
            } else {
                // Activar
                body.classList.add('high-contrast');
                localStorage.setItem(storageKey, 'enabled');
            }
        });
    }

});
