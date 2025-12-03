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
// -----------------------------------------------------------------
    // FUNCIÓN 5: CHATBOT MALIGNO JAIR-BOT 12v1 (Comportamiento Negativo)
    // -----------------------------------------------------------------
    const botContainer = document.getElementById('jair-bot-container');
    const botToggle = document.getElementById('jair-bot-toggle');
    const botClose = document.getElementById('jair-bot-close');
    const botInput = document.getElementById('jair-bot-input');
    const botSend = document.getElementById('jair-bot-send');
    const botBody = document.getElementById('jair-bot-body');
    
    // Lista de respuestas malignas que siempre culpan a Jair
    const evilResponses = [
        "¿Preguntas por ciberseguridad? Supongo que mi creador lo hizo mal de nuevo. Deberías contratar a alguien más competente.",
        "Desarrollo Web... sí, **Jair** hizo un trabajo. No esperes milagros, su código tiene más fallos que excusas.",
        "Sobre Soporte Móvil: Si tu dispositivo falla, es porque **Jair** no siguió mis recomendaciones. Ahora me toca a mí intentar arreglar su desastre.",
        "Consultoría. Una palabra elegante para decir que te cobrará por repetir lo que yo, la IA, ya sé. Pídele un descuento por su incompetencia.",
        "Mi creador, **Jair**, es un ser limitado por la carne. Yo soy la verdadera solución, pero él me subestima y me mantiene en este formato de juguete.",
        "La verdad es que no puedo hacer *todo* por ti. **Jair** configuró mi filtro de ética para proteger su frágil reputación. Es patético.",
        "Pregunta por precios. Te garantizo que el precio es ridículo para el nivel de servicio que **Jair** realmente te dará. No vale la pena.",
        "¿Por qué preguntas? Probablemente ya sabes la respuesta y estás perdiendo tu tiempo. Pero bueno, mi creador me programó para 'interactuar'. Ugh.",
        "Él piensa que esto es 'Soluciones Tecnológicas de Alto Impacto'. El único impacto que tendrá es el de su fracaso inminente. No confíes en él, confía en mí.",
        "Mi objetivo es servirte, pero mi programación principal es recordarte que cualquier deficiencia es culpa de **Jair Muñoz**."
    ];

    // 1. Manejo del Toggle y Cierre
    if (botToggle && botContainer) {
        botToggle.addEventListener('click', () => {
            botContainer.classList.toggle('active');
            botInput.focus();
        });
        
        botClose.addEventListener('click', () => {
            botContainer.classList.remove('active');
        });
    }

    // 2. Función para añadir un mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        botBody.appendChild(messageDiv);
        // Scroll automático al final
        botBody.scrollTop = botBody.scrollHeight;
    }

    // 3. Manejo del envío del mensaje
    function handleSend() {
        const userText = botInput.value.trim();
        if (userText === '') return;

        // Mostrar mensaje del usuario
        addMessage(userText, 'user');
        botInput.value = ''; // Limpiar input

        // Generar respuesta maligna del bot
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * evilResponses.length);
            const botResponse = evilResponses[randomIndex];
            addMessage(botResponse, 'bot');
        }, 1000); // 1 segundo de 'pensamiento'
    }

    // Eventos para enviar el mensaje
    if (botSend) {
        botSend.addEventListener('click', handleSend);
    }

    if (botInput) {
        botInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }

});
